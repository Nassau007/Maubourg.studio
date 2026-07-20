import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';
import { getDictionary } from '@/lib/i18n';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Loose phone check: at least 7 digits, allows +, spaces, (), -, .
const PHONE_RE = /^[+]?[\d\s().-]{7,}$/;

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
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
  const phone = String(body.phone ?? '').trim();
  const email = body.email ? String(body.email).trim() : '';
  const storeUrlRaw = body.storeUrl ? String(body.storeUrl).trim() : '';
  const preferredTime = body.preferredTime ? String(body.preferredTime).trim() : null;
  const message = body.message ? String(body.message).trim() : null;

  // Honeypot: bots fill hidden fields; humans don't.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = t.name;
  if (!PHONE_RE.test(phone)) errors.phone = t.phone;
  if (email && !EMAIL_RE.test(email)) errors.email = t.emailOptional;

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: t.form, fields: errors }, { status: 422 });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        kind: 'call',
        name,
        phone,
        email: email || null,
        storeUrl: normalizeUrl(storeUrlRaw) || null,
        preferredTime,
        message,
        source: 'website',
      },
    });

    // Fire the notification but never let an email failure break the submit.
    await sendLeadNotification(lead);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error('Failed to save call request:', err);
    return NextResponse.json({ error: t.server }, { status: 500 });
  }
}
