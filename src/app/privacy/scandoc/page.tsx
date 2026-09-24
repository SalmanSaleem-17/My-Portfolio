// src/app/privacy/scandoc/page.tsx
// Privacy policy for the ScanDoc Android app. Required by Google Play (Data
// safety + App content) and linked from the app's Settings → Privacy screen.
//
// ScanDoc is fully offline: no ads, no analytics, no accounts, no network
// requests. This page mirrors the other /privacy/* pages so the policies read
// as one family, but its content is deliberately shorter because there is no
// third party to describe.
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, Smartphone, KeyRound, WifiOff, Share2, Trash2, Lock,
  Baby, Scale, RefreshCw, Mail,
} from 'lucide-react'
import { SITE } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'

const url = `${SITE.url}/privacy/scandoc`
const APP = 'ScanDoc'
const FULL = 'ScanDoc: Scanner, PDF & OCR'
const CONTACT = 'contact@salmansaleem.dev'
const EFFECTIVE = 'September 25, 2026'

export const metadata: Metadata = {
  title: `${APP} Privacy Policy`,
  description: `Privacy policy for ${FULL}, the offline Android document scanner. Everything you scan, import, recognise or export stays on your device: no account, no uploads, no ads, no analytics.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Privacy Policy`,
    description: `How ${FULL} handles your data: it never leaves your device. The app makes no network requests at all.`,
    url,
    siteName: SITE.name,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

/* ── Layout primitives (mirrors the resume page's card language) ──────────── */

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-6">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-linear-to-r from-purple-600 to-violet-600 flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-800 dark:text-white">
          {title}
        </h2>
        <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/70" />
      </div>
      <div className="bg-white dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-slate-200/60 dark:border-slate-700/40 shadow-sm text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 space-y-4">
        {children}
      </div>
    </section>
  )
}

function Term({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li className="pl-1">
      <span className="font-bold text-slate-800 dark:text-white">{label}</span>
      {' — '}
      {children}
    </li>
  )
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http') || href.startsWith('mailto')
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="font-semibold text-purple-700 dark:text-purple-300 underline decoration-purple-300/60 dark:decoration-purple-500/40 underline-offset-2 hover:decoration-purple-500 transition-colors"
    >
      {children}
    </a>
  )
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function ScanDocPrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${url}/#webpage`,
              url,
              name: `${APP} — Privacy Policy`,
              description: `Privacy policy for the ${FULL} Android application.`,
              inLanguage: SITE.language,
              isPartOf: { '@id': `${SITE.url}/#website` },
              about: { '@id': `${url}/#app` },
              datePublished: '2026-09-25',
              dateModified: '2026-09-25',
              publisher: { '@id': `${SITE.url}/#person` },
            },
            {
              '@type': 'SoftwareApplication',
              '@id': `${url}/#app`,
              name: FULL,
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Android',
              author: { '@id': `${SITE.url}/#person` },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
          ],
        }}
      />

      <div className="min-h-screen bg-slate-50 dark:bg-transparent">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group mb-6"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>

          {/* ── Header ── */}
          <header className="relative bg-white dark:bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 shadow-sm mb-8">
            <div className="h-1.5 bg-linear-to-r from-purple-600 via-violet-500 to-purple-400" />
            <div className="p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-purple-700 dark:text-purple-300 mb-2">
                Android Application
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
                {APP}{' '}
                <span className="bg-linear-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Effective {EFFECTIVE} · Last updated {EFFECTIVE}
              </p>

              <div className="mt-6 rounded-xl border border-purple-200/80 dark:border-purple-800/40 bg-purple-50 dark:bg-purple-950/30 p-5">
                <p className="text-[13px] font-black uppercase tracking-[0.12em] text-purple-800 dark:text-purple-300 mb-2">
                  In short
                </p>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  {APP} works entirely on your device. It has no account, no servers, no
                  advertising and no analytics, and it makes no network requests. The pages
                  you scan, the files you import, the text it recognises and the reports it
                  produces are stored only on your phone, and the only way any of it leaves
                  is when you choose to share or export a file yourself.
                </p>
              </div>
            </div>
          </header>

          <Section icon={Smartphone} title="1. Information stored on your device">
            <p>
              Everything {APP} handles is written to the app&rsquo;s private storage on your
              phone or tablet and stays there. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
              <Term label="Documents">
                the pages you scan and the PDFs and images you import, together with their
                names, sizes, dates and the folder you assign.
              </Term>
              <Term label="Drafts">
                multi-page scans in progress, including each captured page and, where you
                have edited a page, the original photo so it can be restored.
              </Term>
              <Term label="Recognised text and search index">
                text produced by the built-in offline OCR, kept in a local database so you
                can search your own documents. Recognition runs on the device; no image or
                text is sent anywhere to be read.
              </Term>
              <Term label="Receipt entries">
                the merchant, date and amount you confirm for a receipt, used for the
                reports and CSV files the app builds locally.
              </Term>
              <Term label="Settings and previews">
                your theme choice, and small cached previews of PDF pages that the app can
                regenerate at any time.
              </Term>
            </ul>
            <p>
              None of this is transmitted anywhere. We operate no backend and hold no copy
              of it, which also means we cannot retrieve or restore it for you.
            </p>
          </Section>

          <Section icon={KeyRound} title="2. Permissions the app requests">
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
              <Term label="Camera">
                to photograph pages when you scan. A capture is processed on the device and
                the temporary photo is removed once the page has been added to your draft.
                The camera is used only while you are on the scanning screen.
              </Term>
            </ul>
            <p>
              That is the only permission. The app does not request access to your
              microphone (audio recording is explicitly disabled at build time), contacts,
              location, call logs, SMS, or general file storage. When you import a file or
              choose a photo, Android&rsquo;s own picker hands the app just the items you
              select; when you share or export, Android&rsquo;s share sheet passes the file
              to the app you choose.
            </p>
          </Section>

          <Section icon={WifiOff} title="3. No network, no third parties">
            <p>
              {APP} does not declare or use internet access.{' '}
              <strong className="text-slate-800 dark:text-white">
                It makes no network requests of any kind
              </strong>
              : no analytics, no crash reporting, no advertising, no attribution or tracking
              SDK, no social login, no cloud sync and no remote update checks. Text
              recognition uses a language model bundled inside the app.
            </p>
            <p>
              Because no data is collected or shared, the app&rsquo;s Google Play Data
              safety section reports exactly that.
            </p>
          </Section>

          <Section icon={Share2} title="4. Sharing and exporting">
            <p>
              Data leaves the device only when you act: sharing a document, exporting a PDF,
              image, text file or CSV, or saving to a location you pick. In each case the
              file goes directly to the app or destination you selected through Android,
              and that recipient&rsquo;s own privacy terms apply from then on. {APP} keeps
              no record of where you sent anything.
            </p>
            <p>
              We do not sell, rent or trade personal information, and we cannot disclose
              information we never receive. We would comply with a lawful request, though
              in practice we hold no user data that could be produced.
            </p>
          </Section>

          <Section icon={Trash2} title="5. Retention and deletion">
            <p>
              Your library lives on your device for as long as the app is installed.
              Documents you move to the Trash can be restored for{' '}
              <strong className="text-slate-800 dark:text-white">30 days</strong>, after which
              the app removes them automatically; you can also delete an item permanently,
              or empty the Trash, at any time. Permanent deletion removes the file together
              with its recognised text, search entry, folder and any receipt entry.
            </p>
            <p>
              <strong className="text-slate-800 dark:text-white">
                Uninstalling {APP} permanently deletes everything.
              </strong>{' '}
              The library is deliberately excluded from Android&rsquo;s device backup, so no
              copy is uploaded to a backup service and nothing is restored on a new phone.
              Share or export anything you want to keep. Because we hold no copy, there is
              nothing for us to delete on your behalf and no account to close.
            </p>
          </Section>

          <Section icon={Lock} title="6. Security">
            <p>
              All data is stored in the app&rsquo;s private sandbox directory, which Android
              isolates from other applications, and is protected by your device&rsquo;s
              own lock and encryption. Nothing is transmitted, so there is no traffic to
              intercept. Files you export are protected only as well as the destination
              you send them to.
            </p>
          </Section>

          <Section icon={Baby} title="7. Children">
            <p>
              {APP} is a general-purpose utility and is not directed at children under 13.
              We do not knowingly collect personal information from anyone, children
              included, because the app collects none. If you believe a child has used the
              app to share something they should not have, the file is wherever it was
              sent; the app itself retains nothing about it.
            </p>
          </Section>

          <Section icon={Scale} title="8. Your rights">
            <p>
              Depending on where you live, you may have the right to access, correct,
              delete or port your personal data, to object to or restrict processing, and
              to lodge a complaint with a supervisory authority.
            </p>
            <p>
              For {APP}, every one of these can be exercised directly on your device:
              everything the app holds is visible in the app, editable in the app, and
              removed by deleting it or uninstalling. There is no processing by us to
              object to, because we never receive your data. You are always welcome to
              write to us at the address below.
            </p>
          </Section>

          <Section icon={RefreshCw} title="9. Changes to this policy">
            <p>
              If this policy changes materially — for example if a future version added a
              feature that used the network — the updated version will be published at
              this URL with a new effective date, and the app&rsquo;s store listing and
              Data safety section will be updated to match before that version is released.
              Continued use of the app after an update constitutes acceptance of the
              revised policy.
            </p>
          </Section>

          <Section icon={Mail} title="10. Contact">
            <p>
              Questions, requests, or privacy concerns about {APP}:{' '}
              <A href={`mailto:${CONTACT}`}>{CONTACT}</A>
            </p>
            <p>
              Developer: {SITE.legalName} · {SITE.location.city}, {SITE.location.region},{' '}
              {SITE.location.country} · <A href={SITE.url}>salmansaleem.dev</A>
            </p>
          </Section>

          {/* Site-wide copyright lives in the layout footer; this is just a caption. */}
          <p className="text-center text-[13px] text-slate-400 dark:text-slate-500 mt-10">
            {FULL} · Private by design
          </p>
        </div>
      </div>
    </>
  )
}
