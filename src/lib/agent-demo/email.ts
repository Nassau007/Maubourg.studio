// The two emails the demo sends, both through the existing Resend integration
// in src/lib/email.ts. No second provider, no template engine.
//
// 1. Studio notification, on every successful reveal. Carries "agent-demo" in
//    the subject so these never blur into teardown requests in the same inbox.
//    It deliberately does NOT use the teardown subject shape: the sales-machine
//    Apps Script searches Gmail for "New teardown request" and would otherwise
//    try to draft a teardown reply for a demo lead.
// 2. Result email to the visitor, in the detected product-page language. It
//    proves the address is real and puts the rewrite somewhere they can find
//    it a week later. Sending it is performance of the service they asked for,
//    so it does not depend on the marketing consent box.

import { escapeHtml, sendResendEmail } from '@/lib/email';
import type { Dictionary } from '@/lib/i18n';
import type { AgentResult, StoredRun } from './types';

const BONE = '#F5F1E8';
const INK = '#14140F';
const MUTED = '#565646';

function paragraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 12px;color:${INK};font-size:15px;line-height:1.6;">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function gapList(result: AgentResult): string {
  return result.gaps
    .map(
      (g) =>
        `<li style="margin:0 0 10px;color:${INK};font-size:14px;line-height:1.55;"><strong>${escapeHtml(
          g.label,
        )}</strong><br>${escapeHtml(g.detail)}</li>`,
    )
    .join('');
}

/* ------------------------------------------------------------------ */
/* 1. Studio notification                                              */
/* ------------------------------------------------------------------ */

export async function sendDemoNotification(input: {
  run: StoredRun;
  name: string;
  email: string;
  consent: boolean;
  visitorEmailSent: boolean;
}): Promise<void> {
  const { run, name, email, consent, visitorEmailSent } = input;
  const to = process.env.NOTIFY_EMAIL || 'touchtabletapps@gmail.com';
  const r = run.result;

  const rows: [string, string][] = [
    ['Source', 'agent-demo'],
    ['Name', name],
    ['Email', email],
    ['Product', run.productName],
    ['URL', run.url],
    ['Platform', run.platform],
    ['Page language', run.detectedLanguage],
    ['Extraction confidence', run.confidence],
    ['Site locale', run.locale],
    ['Marketing consent', consent ? 'yes' : 'no'],
    ['Result email', visitorEmailSent ? 'sent' : 'NOT SENT - check Resend'],
    ['Submitted', new Date().toISOString()],
  ];

  const html = `
  <div style="background:${BONE};padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3dbc8;border-radius:14px;overflow:hidden;">
      <div style="background:${INK};padding:18px 24px;">
        <span style="color:${BONE};font-size:16px;font-weight:600;">Agent demo lead</span>
      </div>
      <div style="padding:20px 24px;">
        <table style="border-collapse:collapse;width:100%;">
          ${rows
            .map(
              ([label, value]) =>
                `<tr><td style="padding:5px 16px 5px 0;color:#77776a;font-size:13px;white-space:nowrap;vertical-align:top;">${escapeHtml(
                  label,
                )}</td><td style="padding:5px 0;color:${INK};font-size:14px;">${escapeHtml(
                  value,
                )}</td></tr>`,
            )
            .join('')}
        </table>

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Verdict</h3>
        ${paragraphs(r.verdict)}

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Rewrite</h3>
        ${paragraphs(r.rewrite)}

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Gaps</h3>
        <ul style="margin:0;padding-left:18px;">${gapList(r)}</ul>

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Their current copy (first 200 characters)</h3>
        ${paragraphs(r.before_excerpt)}

        <div style="margin-top:22px;">
          <a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:${INK};color:${BONE};text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:999px;">Reply to ${escapeHtml(
            name,
          )} &rarr;</a>
        </div>
      </div>
    </div>
  </div>`;

  await sendResendEmail({
    to,
    subject: `Agent demo — ${run.productName} — ${name}`,
    html,
    replyTo: email,
    context: `agent-demo lead (${run.platform})`,
  });
}

/* ------------------------------------------------------------------ */
/* 2. Result email to the visitor                                      */
/* ------------------------------------------------------------------ */

export async function sendDemoResult(input: {
  copy: Dictionary['agentDemo']['resultEmail'];
  run: StoredRun;
  name: string;
  email: string;
  callUrl: string;
}): Promise<boolean> {
  const { copy, run, name, email, callUrl } = input;
  const r = run.result;

  const html = `
  <div style="background:${BONE};padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3dbc8;border-radius:14px;overflow:hidden;">
      <div style="background:${INK};padding:18px 24px;">
        <span style="color:${BONE};font-size:16px;font-weight:600;">Maubourg Studio</span>
      </div>
      <div style="padding:22px 24px;">
        <p style="margin:0 0 18px;color:${MUTED};font-size:15px;line-height:1.6;">${escapeHtml(
          copy.intro.replace('{name}', name).replace('{product}', run.productName),
        )}</p>

        <h3 style="margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.verdictLabel,
        )}</h3>
        ${paragraphs(r.verdict)}

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.afterLabel,
        )}</h3>
        <div style="background:${BONE};border-radius:12px;padding:14px 16px;">${paragraphs(r.rewrite)}</div>

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.beforeLabel,
        )}</h3>
        <p style="margin:0;color:#77776a;font-size:14px;line-height:1.6;font-style:italic;">${escapeHtml(
          r.before_excerpt,
        )}</p>

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.gapsLabel,
        )}</h3>
        <ul style="margin:0;padding-left:18px;">${gapList(r)}</ul>

        <p style="margin:26px 0 14px;color:${INK};font-size:15px;line-height:1.6;">${escapeHtml(
          copy.frame,
        )}</p>
        <a href="${escapeHtml(callUrl)}" style="display:inline-block;background:${INK};color:${BONE};text-decoration:none;font-size:14px;font-weight:600;padding:10px 18px;border-radius:999px;">${escapeHtml(
          copy.cta,
        )}</a>

        <p style="margin:24px 0 0;color:#a6967e;font-size:12px;line-height:1.6;">${escapeHtml(
          copy.footer,
        )}</p>
      </div>
    </div>
  </div>`;

  return sendResendEmail({
    to: email,
    subject: copy.subject.replace('{product}', run.productName),
    html,
    replyTo: process.env.NOTIFY_EMAIL || 'hello@maubourg.studio',
    context: 'agent-demo result email',
  });
}
