// src/app/privacy/checkers-master/page.tsx
// Privacy policy for the Checkers Master: Draughts Android app. Required by
// Google Play (Data safety + App content) and by AdMob, and linked from the
// app's Settings → Privacy policy row.
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft, Smartphone, KeyRound, Megaphone, ShieldCheck,
  Share2, Trash2, Lock, Baby, Scale, RefreshCw, Mail, WifiOff,
} from 'lucide-react'
import { SITE } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'

const url = `${SITE.url}/privacy/checkers-master`
const APP = 'Checkers Master'
const FULL = 'Checkers Master: Draughts'
const PACKAGE = 'com.checkersmaster.draughts'
const CONTACT = 'contact@salmansaleem.dev'
const EFFECTIVE = 'September 17, 2026'

export const metadata: Metadata = {
  title: `${APP} Privacy Policy`,
  description: `Privacy policy for ${FULL}, the offline Android checkers and draughts game with 9 rule variants. What the app stores on your device, the permissions it needs, how Google AdMob advertising works, and how to change your ad choices.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Privacy Policy`,
    description: `How ${FULL} handles your data: games, progress and settings stay on your device; ads are served by Google AdMob under your consent.`,
    url,
    siteName: SITE.name,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

/* ── Layout primitives (mirrors the Calc441 / PrintBridge policy language) ──── */

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
        <div className="w-8 h-8 rounded-lg bg-linear-to-r from-amber-600 to-yellow-500 flex items-center justify-center shrink-0 shadow-sm">
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
      className="font-semibold text-amber-700 dark:text-amber-300 underline decoration-amber-300/60 dark:decoration-amber-500/40 underline-offset-2 hover:decoration-amber-500 transition-colors"
    >
      {children}
    </a>
  )
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-slate-800 dark:text-white">{children}</strong>
}

/* ── Page ─────────────────────────────────────────────────────────────────── */

export default function CheckersMasterPrivacyPage() {
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
              datePublished: '2026-09-17',
              dateModified: '2026-09-17',
              publisher: { '@id': `${SITE.url}/#person` },
            },
            {
              '@type': 'SoftwareApplication',
              '@id': `${url}/#app`,
              name: FULL,
              applicationCategory: 'GameApplication',
              applicationSubCategory: 'Board Game',
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
            <div className="h-1.5 bg-linear-to-r from-amber-600 via-yellow-500 to-amber-400" />
            <div className="p-8">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300 mb-2">
                Android Application
              </p>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight mb-3">
                {APP}{' '}
                <span className="bg-linear-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Effective {EFFECTIVE} · Last updated {EFFECTIVE}
              </p>
              <p className="mt-1 text-[13px] font-medium text-slate-400 dark:text-slate-500">
                Applies to {FULL} (<code className="font-mono">{PACKAGE}</code>) on Google Play.
              </p>

              <div className="mt-6 rounded-xl border border-amber-200/80 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-950/30 p-5">
                <p className="text-[13px] font-black uppercase tracking-[0.12em] text-amber-800 dark:text-amber-300 mb-2">
                  In short
                </p>
                <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
                  {FULL} is a checkers and draughts game that plays entirely offline.
                  There are no accounts, no sign-up, no online multiplayer, no analytics
                  and no servers of ours. Your games, statistics, progress and settings
                  never leave your device. The game is free and shows ads through Google
                  AdMob — that is the only third party involved, and you control whether
                  those ads are personalised.
                </p>
              </div>
            </div>
          </header>

          <Section icon={WifiOff} title="1. The game works offline">
            <p>
              Every part of {APP} that matters runs on your device with no connection:
              all nine rule variants, the computer opponent at every difficulty,
              two-player games on one phone, the lessons, the tactics trainer, the
              puzzles and the campaign. The board, the rules and the AI are all bundled
              in the app itself.
            </p>
            <p>
              The app makes <B>no network requests of its own</B>. The only component
              that uses the internet is Google&rsquo;s advertising SDK, described in
              section&nbsp;4. Turn off your connection and everything except ads keeps
              working exactly as before.
            </p>
          </Section>

          <Section icon={Smartphone} title="2. Information stored on your device">
            <p>
              Everything the game remembers is written to local storage on your phone or
              tablet and stays there. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
              <Term label="Game history and saved games">
                finished games with their moves, result, variant and date, plus a single
                unfinished game so you can resume where you left off.
              </Term>
              <Term label="Statistics">
                games played, wins, losses and draws, current and best streaks, pieces
                captured and lost, kings crowned, and total moves.
              </Term>
              <Term label="Learning progress">
                which lessons, tactics, puzzles and campaign stages you have completed,
                your daily-challenge record, and your play streaks.
              </Term>
              <Term label="Achievements and unlocks">
                achievements you have earned, and which board and piece sets you have
                unlocked and selected.
              </Term>
              <Term label="Hints and undos">
                your remaining hint and undo counts, and the date they were last topped
                up.
              </Term>
              <Term label="Local player names">
                the two names you type for pass-and-play games, which default to
                &ldquo;Player&nbsp;1&rdquo; and &ldquo;Player&nbsp;2&rdquo;. These are
                labels on your own screen; we never see them, so please avoid entering
                anything you would not want stored in plain text on your device.
              </Term>
              <Term label="Settings">
                your chosen variant and difficulty, board and piece theme, move hints,
                legal-move highlighting, animation level, high-contrast and piece-outline
                options, sound, music, haptics and language.
              </Term>
              <Term label="Onboarding answer">
                the experience level you pick the first time you open the app, used only
                to suggest a starting difficulty.
              </Term>
              <Term label="Ad pacing counters">
                how many matches you have finished since the last full-screen ad and when
                that ad was shown, so ads stay spaced out. These are plain numbers held
                on your device and are never sent anywhere.
              </Term>
            </ul>
            <p>
              None of this is transmitted to us or to anyone else. We operate no backend
              and hold no copy of it, which also means we cannot retrieve or restore it
              for you.
            </p>
          </Section>

          <Section icon={KeyRound} title="3. Permissions the app requests">
            <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
              <Term label="Internet / network access">
                used only to load ads. Every game feature works with no connection at all.
              </Term>
              <Term label="Advertising ID (AD_ID)">
                declared so that Google&rsquo;s advertising SDK can use the resettable
                Android Advertising ID, as described in section&nbsp;4.
              </Term>
              <Term label="Modify audio settings">
                lets the game request audio focus so its sound effects and ambient music
                behave politely alongside other apps — for example lowering the music
                while an ad plays. It does not record anything.
              </Term>
              <Term label="Vibration">
                for optional haptic feedback on moves and captures. You can turn it off
                in <B>Settings → Audio &amp; haptics</B>.
              </Term>
              <Term label="Microphone — none">
                although the app bundles an audio library capable of recording, recording
                is explicitly disabled at build time and the{' '}
                <code className="font-mono text-[13px]">RECORD_AUDIO</code> permission is
                not declared. The app can only play sound, never capture it.
              </Term>
            </ul>
            <p>
              The app does not request access to your location, contacts, camera, photos,
              files, storage, call logs, or SMS. Android&rsquo;s auto-backup is disabled
              for this app, so your game data is not copied to Google Drive.
            </p>
          </Section>

          <Section icon={Megaphone} title="4. Advertising (Google AdMob)">
            <p>
              {APP} is free and supported by advertising served through{' '}
              <B>Google AdMob</B>. Ads appear as a small banner on the bottom navigation
              bar, as a labelled native card inside longer challenge lists, occasionally
              as a full-screen ad after a match has finished, when you return to the app
              after being away, and as optional rewarded videos you can choose to watch.
            </p>
            <p>
              Advertising never interferes with play. No ad is shown{' '}
              <B>during a match, a multi-capture, a lesson, a puzzle attempt, while the
              computer is thinking, or on a promotion</B>, and no board screen carries a
              banner. Nothing you need in order to play sits behind an ad: normal games,
              two-player games and the core lessons are always free and always available.
              Rewarded videos only ever grant extras — a cosmetic board or piece set, or
              spare hints and undos.
            </p>
            <p>
              To serve and measure those ads, Google and its advertising partners may
              collect and process:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
              <Term label="Advertising identifier">
                the resettable Android Advertising ID (AAID), used to limit repeated ads
                and measure performance.
              </Term>
              <Term label="Device &amp; technical data">
                device model, operating system version, language, coarse region derived
                from IP address, and network type.
              </Term>
              <Term label="Ad interaction data">
                which ads were shown, viewed, or clicked in the app, and whether a
                rewarded video was completed.
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
              tracking SDK, no social login, and no online multiplayer.
            </p>
          </Section>

          <Section icon={ShieldCheck} title="5. Your consent and your choices">
            <p>
              If you are in the European Economic Area, the United Kingdom, Switzerland,
              or a US state with an applicable privacy law, {APP} shows a consent form —
              provided by Google&rsquo;s User Messaging Platform (UMP), a certified
              consent management platform — before any ad is requested. Your answer
              determines whether ads are personalised.
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
              <Term label="Change your choice at any time">
                open <B>Settings → Other → Ad privacy settings</B> in the app to reopen
                the consent form. The row appears wherever Google offers privacy options
                for your region.
              </Term>
              <Term label="Reset or delete your advertising ID">
                Android: <em>Settings → Privacy → Ads → Delete advertising ID</em>.
              </Term>
              <Term label="Rewarded videos are always optional">
                they are only offered when you choose to unlock a cosmetic or top up
                hints and undos, and are never required to play.
              </Term>
              <Term label="Decline entirely">
                if you decline consent where it is required, ads are requested in
                non-personalised form only. Every game feature keeps working.
              </Term>
            </ul>
            <p>
              Regardless of your answer, the app always asks Google for{' '}
              <B>non-personalised ads</B>.
            </p>
          </Section>

          <Section icon={Share2} title="6. Data sharing">
            <p>
              We do not sell, rent, or trade personal information. We do not share your
              data with anyone for our own purposes, because we do not receive it in the
              first place.
            </p>
            <p>
              The only data flowing out of the app is the advertising data described in
              section&nbsp;4, sent directly from the Google Mobile Ads SDK to Google.
              Under the CCPA/CPRA, personalised advertising may be considered a
              &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information; you can
              opt out through the in-app privacy controls above or by deleting your
              advertising ID at the device level.
            </p>
            <p>
              We may disclose information if legally compelled to do so — though in
              practice we hold no user data that could be disclosed.
            </p>
          </Section>

          <Section icon={Trash2} title="7. Retention and deletion">
            <p>
              App data lives on your device for as long as the app is installed.{' '}
              <B>Uninstalling {APP} permanently deletes all of it</B> — games, statistics,
              progress, unlocks and settings. Inside the app you can also wipe everything
              at any time from <B>Settings → Other → Reset all data</B>, or clear your
              saved games from <B>Settings → Other → Game history</B>.
            </p>
            <p>
              Because we hold no copy, there is nothing for us to delete on your behalf
              and no account to close. To have advertising data deleted, use Google&rsquo;s
              controls at{' '}
              <A href="https://myaccount.google.com/data-and-privacy">
                myaccount.google.com/data-and-privacy
              </A>
              .
            </p>
          </Section>

          <Section icon={Lock} title="8. Security">
            <p>
              Local data is stored in the app&rsquo;s private sandbox directory, which
              Android isolates from other applications. The app makes no network requests
              of its own; traffic to Google&rsquo;s ad servers is encrypted in transit
              (HTTPS), and cleartext traffic is disabled at the platform level.
            </p>
          </Section>

          <Section icon={Baby} title="9. Children">
            <p>
              {APP} is a general-audience board game. It is not directed at children under
              13 and we do not knowingly collect personal information from children — the
              app collects none from anyone. Ad content requested by the app is capped at
              Google&rsquo;s <B>&ldquo;General audiences&rdquo; (G)</B> rating. If you
              believe a child has provided personal information through an ad, contact us
              and we will act on it.
            </p>
          </Section>

          <Section icon={Scale} title="10. Your rights">
            <p>
              Depending on where you live, you may have the right to access, correct,
              delete, or port your personal data, to object to or restrict processing, to
              withdraw consent, and to lodge a complaint with a supervisory authority.
            </p>
            <p>
              For data held on your device, you can exercise all of these directly:
              everything is visible in the app, editable in the app, and removed by
              uninstalling or by resetting it from Settings. For advertising data, the
              controller is Google — use the consent controls in section&nbsp;5 or
              Google&rsquo;s own privacy tools. Where consent is the legal basis
              (GDPR Art.&nbsp;6(1)(a)), withdrawing it is as simple as reopening the form
              from <B>Settings</B>. You may also write to us at the address below.
            </p>
          </Section>

          <Section icon={RefreshCw} title="11. Changes to this policy">
            <p>
              If this policy changes materially, the updated version will be published at
              this URL with a new effective date, and — where the change affects how ads
              are served — the in-app consent form will be presented again. Continued use
              of the app after an update constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section icon={Mail} title="12. Contact">
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
            {FULL} · 9 rule variants · Plays completely offline
          </p>
        </div>
      </div>
    </>
  )
}
