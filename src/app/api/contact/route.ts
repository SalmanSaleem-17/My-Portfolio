// src/app/api/contact/route.ts
// Serverless contact endpoint (runs as a Vercel function — no server to manage).
// Sends the visitor's message via Resend to CONTACT_TO_EMAIL, with reply-to set
// to the visitor so hitting "Reply" in your inbox goes straight back to them.

import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// ── Config (override in env; safe defaults so it works out of the box) ────────
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'salmansaleem1771@gmail.com'
// Until salmansaleem.dev is verified in Resend, the test sender delivers to your
// own Resend-account inbox. After verifying the domain, set CONTACT_FROM_EMAIL to
// 'Salman Saleem <contact@salmansaleem.dev>' — no code change needed.
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'Salman Saleem Portfolio <onboarding@resend.dev>'

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  )

// Cardless, editorial email-client-safe HTML (tables + inline styles) — a clean
// full-width surface, avatar with the sender's initial, and the message as an
// accent-bar blockquote instead of a boxed card.
function contactEmailHtml(p: { name: string; email: string; subject: string; message: string }) {
  const name = escapeHtml(p.name)
  const email = escapeHtml(p.email)
  const subject = escapeHtml(p.subject)
  const message = escapeHtml(p.message).replace(/\n/g, '<br>')
  const firstName = name.split(' ')[0] || 'them'
  const initial = escapeHtml((p.name.trim()[0] || '?').toUpperCase())
  const replySubject = encodeURIComponent(`Re: ${p.subject || 'Your message'}`)
  const kicker =
    'font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#7c3aed;'
  const rule = 'height:1px;line-height:1px;font-size:1px;background:#eef2f7;'

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">New message from ${name}${p.subject ? ' — ' + subject : ''}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

        <!-- accent hairline -->
        <tr><td style="height:5px;line-height:5px;font-size:5px;background:linear-gradient(90deg,#7c3aed 0%,#6d28d9 50%,#4f46e5 100%);">&nbsp;</td></tr>

        <!-- header: avatar + name -->
        <tr><td style="padding:46px 44px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td valign="top" style="width:56px;">
              <div style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#4f46e5);color:#ffffff;font-size:23px;font-weight:800;text-align:center;line-height:54px;">${initial}</div>
            </td>
            <td valign="middle" style="padding-left:18px;">
              <div style="${kicker}">New Message</div>
              <div style="font-size:26px;font-weight:800;color:#0f172a;line-height:1.15;margin-top:5px;">${name}</div>
            </td>
          </tr></table>
        </td></tr>

        <!-- meta: email + subject -->
        <tr><td style="padding:16px 44px 0;font-size:15px;">
          <a href="mailto:${email}" style="color:#7c3aed;font-weight:600;text-decoration:none;">${email}</a>${
            subject
              ? `<span style="color:#cbd5e1;padding:0 10px;">&bull;</span><span style="color:#475569;">${subject}</span>`
              : ''
          }
        </td></tr>

        <!-- divider -->
        <tr><td style="padding:30px 44px 0;"><div style="${rule}">&nbsp;</div></td></tr>

        <!-- message as blockquote -->
        <tr><td style="padding:30px 44px 0;">
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#94a3b8;margin-bottom:16px;">Message</div>
          <div style="border-left:3px solid #7c3aed;padding-left:22px;font-size:17px;line-height:1.8;color:#1e293b;">${message}</div>
        </td></tr>

        <!-- reply button -->
        <tr><td style="padding:38px 44px 0;">
          <a href="mailto:${email}?subject=${replySubject}" style="display:inline-block;background:#7c3aed;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;padding:14px 30px;border-radius:10px;">Reply to ${firstName} &rarr;</a>
        </td></tr>

        <!-- footer -->
        <tr><td style="padding:40px 44px 48px;">
          <div style="${rule}margin-bottom:22px;">&nbsp;</div>
          <div style="color:#94a3b8;font-size:12px;line-height:1.7;">
            Reply directly to this email to respond to ${firstName}.<br>
            Sent from your portfolio contact form &middot; <a href="https://salmansaleem.dev" style="color:#7c3aed;text-decoration:none;">salmansaleem.dev</a>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service is not configured yet. Please email me directly.' },
        { status: 503 },
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const subject = String(body.subject ?? '').trim()
    const message = String(body.message ?? '').trim()
    const honeypot = String(body.company ?? '').trim() // hidden anti-spam field
    const elapsedMs = Number(body.elapsedMs)

    // ── Silent bot rejections (return ok so bots get no signal to adapt) ──
    // 1. Honeypot: a hidden field only bots fill.
    if (honeypot) return NextResponse.json({ ok: true })
    // 2. Time-trap: real users can't fill the form in under ~2s; direct-POST
    //    bots omit elapsedMs entirely (NaN).
    if (!Number.isFinite(elapsedMs) || elapsedMs < 2000) {
      return NextResponse.json({ ok: true })
    }

    // ── Validation ──
    if (!name || name.length > 100) {
      return NextResponse.json({ error: 'Please enter a valid name.' }, { status: 400 })
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: 'Please write a message of at least 10 characters.' },
        { status: 400 },
      )
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const cleanSubject = subject
      ? `Portfolio contact: ${subject}`
      : `New portfolio message from ${name}`

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: cleanSubject,
      text: `New message from your portfolio contact form\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || '(none)'}\n\n${message}`,
      html: contactEmailHtml({ name, email, subject, message }),
    })

    if (error) {
      return NextResponse.json(
        { error: 'Could not send the message right now. Please try again shortly.' },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unexpected error. Please try again.' }, { status: 500 })
  }
}
