import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';
import { getDictionary } from '@/lib/i18n';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const t = getDictionary(String(body.lang ?? 'en')).errors;

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const storeUrlRaw = String(body.storeUrl ?? '').trim();
  const platform = body.platform ? String(body.platform).trim() : null;
  const monthlyRevenue = body.monthlyRevenue ? String(body.monthlyRevenue).trim() : null;
  const category = body.category ? String(body.category).trim() : null;
  const message = body.message ? String(body.message).trim() : null;
  // Which of the two forms this came from. The GEO audit is the homepage hook;
  // the conversion diagnostic lives on the conversion page.
  const isAudit = String(body.requestType ?? 'audit') === 'audit';
  const source = isAudit ? 'website-geo-audit' : 'website-conversion-diagnostic';

  // Honeypot: bots fill hidden fields; humans don't.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = t.name;
  if (!EMAIL_RE.test(email)) errors.email = t.email;
  if (!storeUrlRaw) errors.storeUrl = t.storeUrl;
  // The audit cannot be written without a category: it is what the four buying
  // questions are built from. The conversion diagnostic does not need one.
  if (isAudit && !category) errors.category = t.category;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: t.form, fields: errors }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        storeUrl: normalizeUrl(storeUrlRaw),
        platform,
        monthlyRevenue,
        category,
        message,
        source,
      },
    });

    // Fire the notification but never let an email failure break the submit.
    await sendLeadNotification(lead);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error('Failed to save teardown lead:', err);
    return NextResponse.json({ error: t.server }, { status: 500 });
  }
}
