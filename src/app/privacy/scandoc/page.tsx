// src/app/privacy/scandoc/page.tsx
// Privacy policy for the ScanDoc Android app. Required by Google Play (Data
// safety + App content) and by AdMob, and linked from the app's Settings →
// Privacy screen and from the UMP consent form.
//
// ScanDoc processes every document on the device and has no accounts or
// servers. The app is free and shows ads through Google AdMob under the user's
// consent; that is the only third party involved, and this page mirrors the
// other /privacy/* pages so the policies read as one family.
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, Smartphone, KeyRound, Megaphone, ShieldCheck,
  Share2, Trash2, Lock, Baby, Scale, RefreshCw, Mail,
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
  description: `Privacy policy for ${FULL}, the offline Android document scanner. What the app stores on your device, the permissions it needs, how Google AdMob advertising works, and how to change your ad choices.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Privacy Policy`,
    description: `How ${FULL} handles your data: documents, recognised text and settings stay on your device; ads are served by Google AdMob under your consent.`,
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
                  {APP} has no accounts, no analytics and no servers. The pages you scan,
                  the files you import, the text it recognises and the reports it produces
                  are stored only on your device, and the only way any of it leaves is
                  when you choose to share or export a file yourself. The app is free and
                  shows ads through Google AdMob — that is the only third party involved,
                  and you control whether those ads are personalised.
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
                your theme choice, small cached previews of PDF pages that the app can
                regenerate at any time, and, if you watch a rewarded video, the moment your
                ad-free hour expires. That last item is a timestamp — nothing about the ad
                or about you.
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
              <Term label="Photos and files (Android 12 and earlier only)">
                on older Android versions the system may ask for storage or photo access
                the first time you choose an image or file. It is used only to read the
                items you select. On Android 13 and newer no such permission exists; the
                system picker hands the app just what you chose.
              </Term>
              <Term label="Internet access">
                to load ads and, where required, the consent form. Nothing about your
                documents travels over this connection; see section&nbsp;3 for exactly what
                does.
              </Term>
            </ul>
            <p>
              Camera is the only permission the app asks you to grant. It does not request
              your microphone (audio recording is removed at build time), contacts,
              location, call logs or SMS. The build also declares vibration for haptic
              feedback, which needs no approval. When you share or export, Android&rsquo;s
              share sheet passes the file to the app you choose.
            </p>
          </Section>

          <Section icon={Megaphone} title="3. Advertising (Google AdMob)">
            <p>
              {APP} is free and supported by advertising served through{' '}
              <strong className="text-slate-800 dark:text-white">Google AdMob</strong>.
              Ads appear as a banner above the tab bar on the main screens, occasionally as
              a full-screen ad after a task such as text recognition or a PDF merge has
              finished, sometimes when you return to the app after a few minutes away, and
              as an optional rewarded video you can choose to watch. Ads never appear over
              the camera or the page editor.
            </p>
            <p>
              To serve and measure those ads, Google and its advertising partners may
              collect and process:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
              <Term label="Advertising identifier">
                the resettable Android Advertising ID (AAID), used to limit repeated ads
                and measure performance.
              </Term>
              <Term label="Device &amp; technical data">
                device model, operating system version, language, coarse region derived
                from IP address, and network type.
              </Term>
              <Term label="Ad interaction data">
                which ads were shown, viewed, or clicked in the app.
              </Term>
            </ul>
            <p>
              This processing is carried out by Google as an independent controller under
              its own terms. See{' '}
              <A href="https://policies.google.com/technologies/partner-sites">
                How Google uses information from sites or apps that use our services
              </A>
              , the{' '}
              <A href="https://policies.google.com/privacy">Google Privacy Policy</A>, and{' '}
              <A href="https://support.google.com/admob/answer/6128543">
                AdMob&rsquo;s data disclosure
              </A>
              . Where personalised advertising is enabled, Google may use{' '}
              <A href="https://support.google.com/admob/answer/9012903">
                additional ad technology providers
              </A>
              .
            </p>
            <p>
              Advertising is the <em>only</em> reason {APP} contacts a third party. The
              app contains no analytics SDK, no crash reporting, no attribution or
              tracking SDK, no social login and no cloud sync. Your documents and
              recognised text are never part of any ad request.
            </p>
          </Section>

          <Section icon={ShieldCheck} title="4. Your consent and your choices">
            <p>
              If you are in the European Economic Area, the United Kingdom, Switzerland,
              or a US state with an applicable privacy law, {APP} shows a consent form —
              provided by Google&rsquo;s User Messaging Platform (UMP), a certified
              consent management platform — the first time you open the app, before any
              ad is requested. Your answer determines whether ads are personalised.
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
              <Term label="Change your choice at any time">
                open{' '}
                <strong className="text-slate-800 dark:text-white">
                  Settings → Ads → Ad privacy settings
                </strong>{' '}
                in the app to reopen the consent form.
              </Term>
              <Term label="Reset or delete your advertising ID">
                Android:{' '}
                <em>Settings → Privacy → Ads → Delete advertising ID</em>.
              </Term>
              <Term label="Remove ads temporarily">
                choose{' '}
                <strong className="text-slate-800 dark:text-white">
                  Settings → Ads → Remove ads for 1 hour
                </strong>{' '}
                and watch a short video to hide all ads for one hour; watching again adds
                another hour. Rewarded videos are never shown unless you start them.
              </Term>
              <Term label="Decline entirely">
                if you decline consent where it is required, no ads are requested and the
                advertising SDK is not initialised. Every scanning, OCR and PDF feature
                keeps working.
              </Term>
            </ul>
            <p>
              If you decline, {APP} does not fall back to a paywall, degrade features, or
              re-ask on every launch.
            </p>
          </Section>

          <Section icon={Share2} title="5. Data sharing">
            <p>
              We do not sell, rent, or trade personal information. We do not share your
              data with anyone for our own purposes, because we do not receive it in the
              first place.
            </p>
            <p>
              The only data flowing out of the app is the advertising data described in
              section&nbsp;3, sent directly from the Google Mobile Ads SDK to Google. Under
              the CCPA/CPRA, personalised advertising may be considered a
              &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information; you can
              opt out through the in-app privacy controls above or by deleting your
              advertising ID at the device level.
            </p>
            <p>
              Documents leave the device only when you act: sharing, exporting, or saving
              to a location you pick. The file goes directly to the app or destination you
              selected through Android, and that recipient&rsquo;s own privacy terms apply
              from then on. {APP} keeps no record of where you sent anything. We may
              disclose information if legally compelled to do so — though in practice we
              hold no user data that could be disclosed.
            </p>
          </Section>

          <Section icon={Trash2} title="6. Retention and deletion">
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
              nothing for us to delete on your behalf and no account to close. To have
              advertising data deleted, use Google&rsquo;s controls at{' '}
              <A href="https://myaccount.google.com/data-and-privacy">
                myaccount.google.com/data-and-privacy
              </A>
              .
            </p>
          </Section>

          <Section icon={Lock} title="7. Security">
            <p>
              All data is stored in the app&rsquo;s private sandbox directory, which Android
              isolates from other applications, and is protected by your device&rsquo;s
              own lock and encryption. Documents and recognised text are never
              transmitted, so there is no traffic of ours to intercept. Traffic to
              Google&rsquo;s ad servers is encrypted in transit (HTTPS). Files you export
              are protected only as well as the destination you send them to.
            </p>
          </Section>

          <Section icon={Baby} title="8. Children">
            <p>
              {APP} is a general-purpose utility, intended for adults, and is not directed
              at children under 13. We do not knowingly collect personal information from
              children. Ad content requested by the app is capped at Google&rsquo;s{' '}
              <strong className="text-slate-800 dark:text-white">
                &ldquo;General audiences&rdquo; (G)
              </strong>{' '}
              rating. If you believe a child has provided personal information, contact us
              and we will act on it.
            </p>
          </Section>

          <Section icon={Scale} title="9. Your rights">
            <p>
              Depending on where you live, you may have the right to access, correct,
              delete, or port your personal data, to object to or restrict processing, to
              withdraw consent, and to lodge a complaint with a supervisory authority.
            </p>
            <p>
              For data held on your device, you can exercise all of these directly:
              everything is visible in the app, editable in the app, and removed by
              deleting it or uninstalling. For advertising data, the controller is Google
              — use the consent controls in section&nbsp;4 or Google&rsquo;s own privacy
              tools. Where consent is the legal basis (GDPR Art.&nbsp;6(1)(a)), withdrawing
              it is as simple as reopening the form in{' '}
              <strong className="text-slate-800 dark:text-white">Settings → Ads</strong>.
              You may also write to us at the address below.
            </p>
          </Section>

          <Section icon={RefreshCw} title="10. Changes to this policy">
            <p>
              If this policy changes materially, the updated version will be published at
              this URL with a new effective date, and — where the change affects how ads
              are served — the in-app consent form will be presented again. Continued use
              of the app after an update constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section icon={Mail} title="11. Contact">
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
