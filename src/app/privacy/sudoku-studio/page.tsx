// src/app/privacy/sudoku-studio/page.tsx
// Privacy policy for the Sudoku Studio Android app. Required by Google Play
// (Data safety + App content) and by AdMob, and linked from the app's
// Settings → Privacy policy row.
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import {
  Smartphone, KeyRound, Megaphone, ShieldCheck, Share2, Trash2,
  Lock, Baby, Scale, RefreshCw, Mail, WifiOff,
} from 'lucide-react'
import { SITE } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'
import { A, B, LIST, LegalPage, Section, Term } from '@/components/legal/LegalPrimitives'

const url = `${SITE.url}/privacy/sudoku-studio`
const APP = 'Sudoku Studio'
const PACKAGE = 'com.sudoku.studio'
const CONTACT = 'contact@salmansaleem.dev'
const EFFECTIVE = 'November 22, 2026'

export const metadata: Metadata = {
  title: `${APP} Privacy Policy`,
  description: `Privacy policy for ${APP}, the offline classic 9×9 Sudoku game for Android. What the app stores on your device, the permissions it needs, how optional Google AdMob rewarded ads work, and how to change your ad choices.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Privacy Policy`,
    description: `How ${APP} handles your data: puzzles, progress and settings stay on your device; the only ads are optional rewarded videos served by Google AdMob under your consent.`,
    url,
    siteName: SITE.name,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

export default function SudokuStudioPrivacyPage() {
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
              description: `Privacy policy for the ${APP} Android application.`,
              inLanguage: SITE.language,
              isPartOf: { '@id': `${SITE.url}/#website` },
              about: { '@id': `${url}/#app` },
              datePublished: '2026-11-22',
              dateModified: '2026-11-22',
              publisher: { '@id': `${SITE.url}/#person` },
            },
            {
              '@type': 'SoftwareApplication',
              '@id': `${url}/#app`,
              name: APP,
              applicationCategory: 'GameApplication',
              applicationSubCategory: 'Puzzle Game',
              operatingSystem: 'Android',
              author: { '@id': `${SITE.url}/#person` },
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            },
          ],
        }}
      />

      <LegalPage
        app={APP}
        document="Privacy Policy"
        effective={EFFECTIVE}
        appliesTo={
          <>
            Applies to {APP} (<code className="font-mono">{PACKAGE}</code>) on Google Play.
          </>
        }
        summary={
          <>
            {APP} is a classic 9×9 Sudoku game that plays entirely offline. There are no
            accounts, no sign-up, no cloud saves, no analytics and no servers of ours. Your
            puzzles, progress, statistics and settings never leave your device. The game is
            free; the only advertising is an optional rewarded video, served by Google AdMob,
            that you can choose to watch to earn hint credits. Google AdMob is the only third
            party involved.
          </>
        }
        caption={`${APP} · Classic 9×9 Sudoku · Plays completely offline`}
      >
        <Section icon={WifiOff} title="1. The game works offline">
          <p>
            Everything in {APP} runs on your device with no connection: every puzzle at every
            difficulty, the daily puzzle, the practice drills, notes, undo, the timer and the
            step-by-step hints. All puzzles are bundled inside the app, and the daily puzzle is
            chosen from that bundle using your device&rsquo;s own calendar date.
          </p>
          <p>
            The app makes <B>no network requests of its own</B>. The only component that uses
            the internet is Google&rsquo;s advertising and consent software, described in
            sections&nbsp;4 and&nbsp;5. Turn off your connection and everything except earning
            hint credits from ads keeps working exactly as before.
          </p>
        </Section>

        <Section icon={Smartphone} title="2. Information stored on your device">
          <p>
            Everything the game remembers is written to a local database in the app&rsquo;s
            private storage on your phone or tablet, and stays there. Specifically:
          </p>
          <ul className={LIST}>
            <Term label="Puzzles in progress">
              one classic puzzle and one daily puzzle, each with the digits you have entered,
              your pencil notes, your undo history, the time you have played, and your mistake
              and hint counts, so you can resume where you left off.
            </Term>
            <Term label="Completed puzzles">
              for each puzzle you finish: which puzzle it was, its difficulty, your time,
              mistakes and hints used, when you finished it, and for daily puzzles the calendar
              date it belongs to. This is what the daily calendar shows.
            </Term>
            <Term label="Hint credits">
              your current credit balance, plus a short record of each reward earned and each
              credit spent (a random identifier and a timestamp). These records exist only so a
              reward or a spend can never be counted twice.
            </Term>
            <Term label="Hint explanations">
              the explanation for a hint you have already revealed, so reopening it for the
              same board is free.
            </Term>
            <Term label="Settings">
              timer, mistake feedback, smart notes, number-first entry, haptics and reduced
              motion.
            </Term>
          </ul>
          <p>
            None of this is transmitted to us or to anyone else. We operate no backend and hold
            no copy of it, which also means we cannot retrieve, restore or transfer it for you.
            The app asks for no name, email address or any other personal detail.
          </p>
        </Section>

        <Section icon={KeyRound} title="3. Permissions the app requests">
          <ul className={LIST}>
            <Term label="Internet and network state">
              used only by Google&rsquo;s advertising and consent software. Every game feature
              works with no connection at all.
            </Term>
            <Term label="Advertising ID (AD_ID)">
              declared so that Google&rsquo;s advertising SDK can use the resettable Android
              Advertising ID, as described in section&nbsp;4.
            </Term>
            <Term label="Vibration">
              for optional haptic feedback when you enter a digit. You can turn it off in{' '}
              <B>Settings → Feel → Haptics</B>.
            </Term>
          </ul>
          <p>
            The app does not request access to your location, contacts, camera, microphone,
            photos, call logs or SMS, and it does not read or write your files. Some standard
            entries are declared by the framework the app is built with (for example storage
            access on Android&nbsp;12 and older); {APP} does not use them.
          </p>
        </Section>

        <Section icon={Megaphone} title="4. Advertising (Google AdMob)">
          <p>
            {APP} shows exactly one kind of ad: an <B>optional rewarded video</B>, served
            through <B>Google AdMob</B>. It appears only when you open the hint panel, choose
            &ldquo;Earn hint credits&rdquo; and then confirm &ldquo;Watch ad&rdquo;. Watching
            one ad to the end adds two hint credits.
          </p>
          <p>
            There are <B>no banner ads, no full-screen ads between puzzles and no ads when the
            app opens</B>. An ad never starts on its own. No puzzle, difficulty, practice drill,
            daily puzzle or result sits behind an ad: every puzzle includes one free hint, and
            the practice explanations are always free.
          </p>
          <p>
            To serve and measure those ads, Google and its advertising partners may collect and
            process:
          </p>
          <ul className={LIST}>
            <Term label="Advertising identifier">
              the resettable Android Advertising ID (AAID), used to limit repeated ads, measure
              performance and, where you allow it, personalise ads.
            </Term>
            <Term label="Device and technical data">
              device model, operating system version, language, coarse region derived from IP
              address, and network type.
            </Term>
            <Term label="Ad interaction data">
              which ads were shown, viewed or clicked in the app, and whether a rewarded video
              was completed.
            </Term>
          </ul>
          <p>
            This processing is carried out by Google as an independent controller under its own
            terms. See{' '}
            <A href="https://policies.google.com/technologies/partner-sites">
              How Google uses information from sites or apps that use our services
            </A>
            , the <A href="https://policies.google.com/privacy">Google Privacy Policy</A>, and{' '}
            <A href="https://support.google.com/admob/answer/6128543">AdMob&rsquo;s data disclosure</A>
            . Where personalised advertising is enabled, Google may use{' '}
            <A href="https://support.google.com/admob/answer/9012903">
              additional ad technology providers
            </A>
            .
          </p>
          <p>
            Advertising is the <em>only</em> reason {APP} contacts a third party. The app
            contains no analytics SDK, no crash reporting, no attribution or tracking SDK, no
            social login and no online multiplayer.
          </p>
        </Section>

        <Section icon={ShieldCheck} title="5. Your consent and your choices">
          <p>
            If you are in the European Economic Area, the United Kingdom, Switzerland, or
            another region where Google requires it, {APP} shows a consent form — provided by
            Google&rsquo;s User Messaging Platform (UMP), a certified consent management
            platform — before any ad is requested. Your answer determines whether ads may be
            requested and whether they are personalised.
          </p>
          <ul className={LIST}>
            <Term label="Change your choice at any time">
              open <B>Settings → Hints and ads → Ad privacy options</B> in the app to reopen the
              consent form. The row appears wherever Google offers privacy options for your
              region.
            </Term>
            <Term label="Reset or delete your advertising ID">
              Android: <em>Settings → Privacy → Ads → Delete advertising ID</em>.
            </Term>
            <Term label="Never watch an ad">
              rewarded videos are only offered when you ask for them and are never required.
              If you never tap &ldquo;Watch ad&rdquo;, no ad is ever shown.
            </Term>
            <Term label="Decline consent">
              if your choices do not allow ads to be requested, the option to earn credits is
              shown as unavailable. Every game feature keeps working.
            </Term>
          </ul>
        </Section>

        <Section icon={Share2} title="6. Data sharing">
          <p>
            We do not sell, rent or trade personal information. We do not share your data with
            anyone for our own purposes, because we do not receive it in the first place.
          </p>
          <p>
            The only data flowing out of the app is the advertising data described in
            section&nbsp;4, sent directly from the Google Mobile Ads SDK to Google. Under the
            CCPA/CPRA, personalised advertising may be considered a &ldquo;sale&rdquo; or
            &ldquo;sharing&rdquo; of personal information; you can opt out through the in-app
            privacy controls above or by deleting your advertising ID at the device level.
          </p>
          <p>
            We may disclose information if legally compelled to do so — though in practice we
            hold no user data that could be disclosed.
          </p>
        </Section>

        <Section icon={Trash2} title="7. Retention and deletion">
          <p>
            App data lives on your device for as long as the app is installed.{' '}
            <B>Uninstalling {APP} permanently deletes all of it</B> — puzzles in progress,
            completed puzzles, hint credits and settings. You can also erase everything without
            uninstalling from Android: <em>Settings → Apps → {APP} → Storage → Clear storage</em>.
          </p>
          <p>
            Hint credits exist only on your device. They are not linked to any account, cannot
            be transferred to another device, and cannot be restored by us after they are
            deleted.
          </p>
          <p>
            Because we hold no copy, there is nothing for us to delete on your behalf and no
            account to close. To have advertising data deleted, use Google&rsquo;s controls at{' '}
            <A href="https://myaccount.google.com/data-and-privacy">
              myaccount.google.com/data-and-privacy
            </A>
            .
          </p>
        </Section>

        <Section icon={Lock} title="8. Security">
          <p>
            Local data is stored in the app&rsquo;s private sandbox directory, which Android
            isolates from other applications. The app makes no network requests of its own, and
            traffic between Google&rsquo;s advertising software and Google&rsquo;s servers is
            encrypted in transit (HTTPS).
          </p>
        </Section>

        <Section icon={Baby} title="9. Children">
          <p>
            {APP} is a general-audience puzzle game. It is not directed at children under 13 and
            we do not knowingly collect personal information from children — the app collects
            none from anyone. If you believe a child has provided personal information through
            an ad, contact us and we will act on it.
          </p>
        </Section>

        <Section icon={Scale} title="10. Your rights">
          <p>
            Depending on where you live, you may have the right to access, correct, delete or
            port your personal data, to object to or restrict processing, to withdraw consent,
            and to lodge a complaint with a supervisory authority.
          </p>
          <p>
            For data held on your device, you can exercise all of these directly: everything is
            visible in the app and is removed by uninstalling it or clearing its storage. For
            advertising data, the controller is Google — use the consent controls in
            section&nbsp;5 or Google&rsquo;s own privacy tools. Where consent is the legal basis
            (GDPR Art.&nbsp;6(1)(a)), withdrawing it is as simple as reopening the form from{' '}
            <B>Settings</B>. You may also write to us at the address below.
          </p>
        </Section>

        <Section icon={RefreshCw} title="11. Changes to this policy">
          <p>
            If this policy changes materially, the updated version will be published at this URL
            with a new effective date. Continued use of the app after an update constitutes
            acceptance of the revised policy. The rules for using the app are in the{' '}
            <A href="/terms/sudoku-studio">{APP} Terms of Service</A>.
          </p>
        </Section>

        <Section icon={Mail} title="12. Contact">
          <p>
            Questions, requests or privacy concerns about {APP}:{' '}
            <A href={`mailto:${CONTACT}`}>{CONTACT}</A>
          </p>
          <p>
            Developer: {SITE.legalName} · {SITE.location.city}, {SITE.location.region},{' '}
            {SITE.location.country} · <A href={SITE.url}>salmansaleem.dev</A>
          </p>
        </Section>
      </LegalPage>
    </>
  )
}
