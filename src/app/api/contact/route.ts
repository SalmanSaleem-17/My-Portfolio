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
      html: `
        <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;margin:auto">
          <h2 style="margin:0 0 4px">📬 New portfolio message</h2>
          <p style="color:#64748b;margin:0 0 16px">via salmansaleem.dev contact form</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#64748b;width:90px">Name</td><td style="padding:6px 0"><strong>${escapeHtml(name)}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#64748b">Subject</td><td style="padding:6px 0">${escapeHtml(subject) || '<em>(none)</em>'}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#f8fafc;border-radius:12px;white-space:pre-wrap;font-size:15px;line-height:1.6;color:#0f172a">${escapeHtml(message)}</div>
        </div>
      `,
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
