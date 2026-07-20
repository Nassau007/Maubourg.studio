import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';

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

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const storeUrlRaw = String(body.storeUrl ?? '').trim();
  const platform = body.platform ? String(body.platform).trim() : null;
  const monthlyRevenue = body.monthlyRevenue ? String(body.monthlyRevenue).trim() : null;
  const message = body.message ? String(body.message).trim() : null;

  // Honeypot: bots fill hidden fields; humans don't.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please add your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please add a valid email.';
  if (!storeUrlRaw) errors.storeUrl = 'Please add your store URL.';

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: 'Please check the form.', fields: errors }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        storeUrl: normalizeUrl(storeUrlRaw),
        platform,
        monthlyRevenue,
        message,
        source: 'website',
      },
    });

    // Fire the notification but never let an email failure break the submit.
    await sendLeadNotification(lead);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error('Failed to save teardown lead:', err);
    return NextResponse.json(
      { error: 'Something went wrong on our side. Please email us directly.' },
      { status: 500 },
    );
  }
}
