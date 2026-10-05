// The emails the demo sends, all through the existing Resend integration in
// src/lib/email.ts. No second provider, no template engine.
//
// 1. Studio notification, on every successful reveal. Carries "agent-demo" in
//    the subject so these never blur into teardown requests in the same inbox.
//    It deliberately does NOT use the teardown subject shape: the sales-machine
//    Apps Script searches Gmail for "New teardown request" and would otherwise
//    try to draft a teardown reply for a demo lead.
// 2. Result email to the visitor, in the detected product-page language. It
//    proves the address is real and puts the new description, the checks and
//    the Product block somewhere they can find them a week later. Sending it is performance of the service they asked for,
//    so it does not depend on the marketing consent box.
// 3. Run notice, sent instead of 1 and 2 while GATE_MODE is 'open'. With no
//    address collected there is no lead and nobody to write to: this says which
//    store ran the demo and what the agent told them, and it says on its face
//    that there is no one to reply to. Same "Agent demo" subject prefix, still
//    outside the Apps Script's search.

import { escapeHtml, sendResendEmail } from '@/lib/email';
import { getDictionary, type Dictionary } from '@/lib/i18n';
import { checkSummary } from './checkText';
import type { AgentResult, Checks, ProductBlock, StoredRun } from './types';

const BONE = '#F5F1E8';
const INK = '#14140F';
const MUTED = '#565646';

function paragraphs(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((block) => `<p style="margin:0 0 12px;color:${INK};font-size:15px;line-height:1.6;">${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** The three checks as short titled lists. */
function checksHtml(checks: Checks, copy: Dictionary['agentDemo']['checks']): string {
  return checkSummary(checks, copy)
    .map(
      (block) =>
        `<p style="margin:14px 0 4px;color:${INK};font-size:14px;font-weight:600;">${escapeHtml(
          block.title,
        )}</p><ul style="margin:0;padding-left:18px;">${block.lines
          .map(
            (line) =>
              `<li style="margin:0 0 4px;color:${INK};font-size:13.5px;line-height:1.5;">${escapeHtml(line)}</li>`,
          )
          .join('')}</ul>`,
    )
    .join('');
}

/** The Product block as monospace text, and what was left for the owner to fill. */
function blockHtml(
  block: ProductBlock,
  fields: Dictionary['agentDemo']['productBlock']['fields'],
  toCompleteLabel: string,
): string {
  const code = `<pre style="margin:0;background:${BONE};border-radius:10px;padding:12px 14px;font:12px/1.5 Menlo,Consolas,monospace;color:${INK};white-space:pre-wrap;word-break:break-word;">${escapeHtml(
    block.snippet,
  )}</pre>`;
  if (!block.toComplete.length) return code;
  return `${code}<p style="margin:12px 0 4px;color:${MUTED};font-size:13px;">${escapeHtml(
    toCompleteLabel,
  )}</p><ul style="margin:0;padding-left:18px;">${block.toComplete
    .map((g) => `<li style="color:${MUTED};font-size:13px;line-height:1.5;">${escapeHtml(fields[g])}</li>`)
    .join('')}</ul>`;
}

const STUDIO = getDictionary('en').agentDemo;

/** The notification's "Rebuilt page" row: whether there is one, and how the copy got in. */
function rebuiltLine(run: Pick<StoredRun, 'renderedHtml' | 'renderMode'>): string {
  if (run.renderMode === 'inserted') return 'yes - added under the title, the page HTML has no description in its text';
  if (run.renderedHtml) return 'yes - new description in place of the old one';
  return 'no - no certain place for it';
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
    ['Rebuilt page', rebuiltLine(run)],
    ['Block to complete', run.productBlock.toComplete.join(', ') || 'nothing'],
    ['Site locale', run.locale],
    ['Marketing consent (GEO emails)', consent ? 'yes' : 'no'],
    ['Result email', visitorEmailSent ? 'sent' : 'NOT SENT - check Resend'],
    ['Submitted', new Date().toISOString()],
  ];

  const html = `
  <div style="background:${BONE};padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3dbc8;border-radius:14px;overflow:hidden;">
      <div style="background:${INK};padding:18px 24px;">
        <span style="color:${BONE};font-size:16px;font-weight:600;">Agent demo lead (GEO)</span>
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

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">New description</h3>
        ${paragraphs(r.rewrite)}

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Gaps</h3>
        <ul style="margin:0;padding-left:18px;">${gapList(r)}</ul>

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Checks</h3>
        ${checksHtml(run.checks, STUDIO.checks)}

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
    subject: `Agent demo (GEO) - ${run.productName} - ${name}`,
    html,
    replyTo: email,
    context: `agent-demo lead (${run.platform})`,
  });
}

/* ------------------------------------------------------------------ */
/* 1b. Run notice, while the gate is open                              */
/* ------------------------------------------------------------------ */

/**
 * Never throws and never blocks: sendResendEmail swallows its own failures,
 * and a missing key only logs. A studio notice must not cost a visitor the
 * result they came for.
 */
export async function sendDemoRunNotice(input: {
  run: Omit<StoredRun, 'createdAt' | 'expiresAt'>;
}): Promise<void> {
  const { run } = input;
  const to = process.env.NOTIFY_EMAIL || 'touchtabletapps@gmail.com';
  const r = run.result;

  const rows: [string, string][] = [
    ['Source', 'agent-demo (no gate)'],
    ['Contact', 'none collected - the demo asks for no name and no email'],
    ['Product', run.productName],
    ['URL', run.url],
    ['Platform', run.platform],
    ['Page language', run.detectedLanguage],
    ['Extraction confidence', run.confidence],
    ['Rebuilt page', rebuiltLine(run)],
    ['Block to complete', run.productBlock.toComplete.join(', ') || 'nothing'],
    ['Site locale', run.locale],
    ['Run at', new Date().toISOString()],
  ];

  const html = `
  <div style="background:${BONE};padding:24px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid #e3dbc8;border-radius:14px;overflow:hidden;">
      <div style="background:${INK};padding:18px 24px;">
        <span style="color:${BONE};font-size:16px;font-weight:600;">Agent demo run</span>
      </div>
      <div style="padding:20px 24px;">
        <p style="margin:0 0 16px;color:${MUTED};font-size:14px;line-height:1.6;">Someone ran the demo on the page below. The demo is open, so there is no address here and nobody to reply to. This is a record of what the agent said, and of which store is looking.</p>
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

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">New description</h3>
        ${paragraphs(r.rewrite)}

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Gaps</h3>
        <ul style="margin:0;padding-left:18px;">${gapList(r)}</ul>

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Checks</h3>
        ${checksHtml(run.checks, STUDIO.checks)}

        <h3 style="margin:24px 0 8px;font-size:14px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">Their current copy (first 200 characters)</h3>
        ${paragraphs(r.before_excerpt)}
      </div>
    </div>
  </div>`;

  await sendResendEmail({
    to,
    subject: `Agent demo run (GEO) - ${run.productName}`,
    html,
    context: `agent-demo run (${run.platform})`,
  });
}

/* ------------------------------------------------------------------ */
/* 2. Result email to the visitor                                      */
/* ------------------------------------------------------------------ */

export async function sendDemoResult(input: {
  /** The agentDemo block in the product page's language. */
  demo: Dictionary['agentDemo'];
  run: StoredRun;
  name: string;
  email: string;
  callUrl: string;
}): Promise<boolean> {
  const { demo, run, name, email, callUrl } = input;
  const copy = demo.resultEmail;
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
          copy.gapsLabel,
        )}</h3>
        <ul style="margin:0;padding-left:18px;">${gapList(r)}</ul>

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.checksLabel,
        )}</h3>
        ${checksHtml(run.checks, demo.checks)}

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.afterLabel,
        )}</h3>
        <div style="background:${BONE};border-radius:12px;padding:14px 16px;">${paragraphs(r.rewrite)}</div>

        ${
          run.renderedHtml
            ? `<p style="margin:16px 0 0;color:${MUTED};font-size:13px;line-height:1.6;">${escapeHtml(
                copy.previewNote,
              )}</p>`
            : ''
        }

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.blockLabel,
        )}</h3>
        <p style="margin:0 0 10px;color:${MUTED};font-size:13px;line-height:1.6;">${escapeHtml(copy.blockNote)}</p>
        ${blockHtml(run.productBlock, demo.productBlock.fields, copy.toCompleteLabel)}

        <h3 style="margin:24px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:#77776a;">${escapeHtml(
          copy.beforeLabel,
        )}</h3>
        <p style="margin:0;color:#77776a;font-size:14px;line-height:1.6;font-style:italic;">${escapeHtml(
          r.before_excerpt,
        )}</p>

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
