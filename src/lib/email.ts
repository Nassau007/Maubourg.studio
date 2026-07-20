// Lead-notification email via Resend (https://resend.com).
//
// Uses the REST API directly (no SDK dependency). If RESEND_API_KEY is not
// set, this is a no-op that just logs — so the form keeps working with or
// without email configured.

type LeadEmail = {
  id: number;
  name: string;
  email: string;
  storeUrl: string;
  platform?: string | null;
  monthlyRevenue?: string | null;
  message?: string | null;
  createdAt: Date;
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value?: string | null): string {
  if (!value) return '';
  return `
    <tr>
      <td style="padding:6px 16px 6px 0;color:#77776a;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:6px 0;color:#14140f;font-size:14px;">${escapeHtml(value)}</td>
    </tr>`;
}

/**
 * Sends a "new teardown request" email to the studio inbox.
 * Never throws — email failures must not break the form submission.
 */
export async function sendLeadNotification(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || 'touchtabletapps@gmail.com';
  // Default sender works out of the box with a Resend account (no domain
  // verification needed to email your own account address).
  const from = process.env.NOTIFY_FROM || 'Maubourg Studio <onboarding@resend.dev>';

  if (!apiKey) {
    console.warn(
      `[email] RESEND_API_KEY not set — skipping notification for lead #${lead.id} (${lead.email}).`,
    );
    return;
  }

  const store = escapeHtml(lead.storeUrl);
  const subject = `New teardown request — ${lead.name} (${lead.storeUrl})`;

  const html = `
  <div style="background:#f5f1e8;padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e3dbc8;border-radius:14px;overflow:hidden;">
      <div style="background:#14140f;padding:18px 24px;">
        <span style="color:#f5f1e8;font-size:16px;font-weight:600;">New free-teardown request</span>
      </div>
      <div style="padding:20px 24px;">
        <p style="margin:0 0 16px;color:#565646;font-size:14px;">
          A store owner just requested a teardown from the website.
        </p>
        <table style="border-collapse:collapse;width:100%;">
          ${row('Name', lead.name)}
          ${row('Email', lead.email)}
          ${`<tr><td style="padding:6px 16px 6px 0;color:#77776a;font-size:13px;white-space:nowrap;vertical-align:top;">Store</td><td style="padding:6px 0;font-size:14px;"><a href="${store}" style="color:#0e6b4a;">${store}</a></td></tr>`}
          ${row('Platform', lead.platform)}
          ${row('Monthly revenue', lead.monthlyRevenue)}
          ${row('Message', lead.message)}
          ${row('Submitted', lead.createdAt.toISOString())}
        </table>
        <div style="margin-top:20px;">
          <a href="mailto:${escapeHtml(lead.email)}?subject=Your%20store%20teardown"
             style="display:inline-block;background:#14140f;color:#f5f1e8;text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:999px;">
            Reply to ${escapeHtml(lead.name)} →
          </a>
        </div>
      </div>
      <div style="padding:12px 24px;border-top:1px solid #efe9db;color:#a6967e;font-size:12px;">
        Lead #${lead.id} · Maubourg Studio
      </div>
    </div>
  </div>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: lead.email,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[email] Resend responded ${res.status} for lead #${lead.id}: ${detail}`);
    }
  } catch (err) {
    console.error(`[email] Failed to send notification for lead #${lead.id}:`, err);
  }
}
