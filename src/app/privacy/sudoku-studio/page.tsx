// src/app/privacy/sudoku-studio/page.tsx
// Privacy policy for the Sudoku Studio Android app. Required by Google Play
// (Data safety + App content) and by AdMob, and linked from the app's
// Settings → About and privacy → Privacy policy row.
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import {
  Smartphone, KeyRound, Megaphone, ShieldCheck, Send, Save, Share2, Trash2,
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
const UPDATED = 'November 23, 2026'

export const metadata: Metadata = {
  title: `${APP} Privacy Policy`,
  description: `Privacy policy for ${APP}, the offline Sudoku game for Android. What the app stores on your device, the permissions it needs, what a shared challenge code or backup file contains, how optional Google AdMob rewarded ads work, and how to change your ad choices.`,
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
              dateModified: '2026-11-23',
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
        updated={UPDATED}
        appliesTo={
          <>
            Applies to {APP} (<code className="font-mono">{PACKAGE}</code>) on Google Play.
          </>
        }
        summary={
          <>
            {APP} is a Sudoku game that plays entirely offline. There are no accounts, no
            sign-up, no cloud saves, no analytics and no servers of ours. Your puzzles,
            progress, statistics and settings stay on your device; the only game data that
            ever leaves it is a challenge code or a backup file that you choose to share or
            save yourself. The game is free; the only advertising is an optional rewarded
            video, served by Google AdMob, that plays only when you ask for one. Google AdMob
            is the only third party involved.
          </>
        }
        caption={`${APP} · Sudoku puzzles · Plays completely offline`}
      >
        <Section icon={WifiOff} title="1. The game works offline">
          <p>
            Everything in {APP} runs on your device with no connection: the 9×9 puzzles, the
            120 Levels, the smaller 4×4 and 6×6 boards, the Diagonal, Killer and Irregular
            variants, the Daily Puzzle, the Weekly stages, Speed Round, Challenge a Friend,
            puzzles you type in yourself, the technique packs and practice drills, statistics,
            achievements, notes, undo, the timer and the step-by-step hints. All puzzles are bundled inside the app. The daily and weekly
            puzzles are chosen from that bundle using your device&rsquo;s own calendar date.
          </p>
          <p>
            The app makes <B>no network requests of its own</B>. The only component that uses
            the internet is Google&rsquo;s advertising and consent software, described in
            sections&nbsp;4 and&nbsp;5. Turn off your connection and everything except the
            optional ad offers keeps working exactly as before.
          </p>
        </Section>

        <Section icon={Smartphone} title="2. Information stored on your device">
          <p>
            Everything the game remembers is written to a local database in the app&rsquo;s
            private storage on your phone or tablet, and stays there. Specifically:
          </p>
          <ul className={LIST}>
            <Term label="Games in progress">
              the games you can come back to: a classic game (including a puzzle you typed in),
              a level, a daily puzzle, a weekly stage, a challenge, a technique-pack puzzle, a
              mini game, a speed round, and your place in each mini board and variant. Each is
              saved with the digits you have entered, your pencil notes and colour marks, your
              undo history, the time you have played, your mistake and hint counts, and its
              time and mistake limits.
            </Term>
            <Term label="Completed games">
              for each game you finish: which puzzle it was, its difficulty and board size,
              your time, mistakes and hints used, when you finished it, the calendar date or
              week it belongs to for daily and weekly puzzles, the level number and stars for
              a level, and the challenge or technique pack it was part of.
            </Term>
            <Term label="Mistake review">
              for 9×9 games, each incorrect entry you made (the cell, the digit you entered,
              the correct digit and the board at that moment), up to 100 per game, so you can
              review them afterwards.
            </Term>
            <Term label="Speed Round records">
              for each board and round length: your best score, rounds played, correct digits,
              mistakes and your five most recent rounds.
            </Term>
            <Term label="Challenge results">
              your own time for each challenge, and any friend&rsquo;s result code you paste
              into the app to compare times (see section&nbsp;6).
            </Term>
            <Term label="Streak repairs">
              the dates of any missed Daily Puzzle days you repaired.
            </Term>
            <Term label="Hint credits and rewards">
              your current credit balance, plus a short record of each reward paid and each
              credit spent (an identifier such as the ad attempt or the level cleared, and a
              timestamp). These records exist only so a reward or a spend can never be counted
              twice.
            </Term>
            <Term label="Hint explanations">
              the explanation for a hint you have already revealed, so reopening it for the
              same board is free.
            </Term>
            <Term label="Settings">
              elapsed timer, mistake feedback, smart notes, pick number first, vibration,
              reduce motion, board theme, and whether the daily reminder is on and at what
              time.
            </Term>
          </ul>
          <p>
            Your statistics, streaks, level stars, experience, player level and achievements
            are calculated on your device from the completed games above; they are not stored
            anywhere else.
          </p>
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
              <B>Settings → Comfort → Vibration</B>.
            </Term>
            <Term label="Notifications">
              requested only if you turn on <B>Settings → Daily reminder</B>. The reminder is
              a notification scheduled on your own device once a day; no push service is used
              and nothing is sent anywhere. A related entry lets the reminder be set again
              after the phone restarts. Turn the reminder off at any time in the same place.
            </Term>
          </ul>
          <p>
            The app does not request access to your location, contacts, camera, microphone,
            photos, call logs or SMS. It touches files only when you save or restore a backup
            (section&nbsp;7): it writes one backup file for you to save, and reads the one file
            you pick. Some standard entries are declared by the framework the app is built with
            (for example storage access on Android&nbsp;12 and older); {APP} does not use them
            for anything else. Android&rsquo;s
            automatic backup is turned off for this app, so your game data is not copied to
            Google Drive.
          </p>
        </Section>

        <Section icon={Megaphone} title="4. Advertising (Google AdMob)">
          <p>
            {APP} shows exactly one kind of ad: an <B>optional rewarded video</B>, served
            through <B>Google AdMob</B>. It plays only when you ask for it, in one of three
            places:
          </p>
          <ul className={LIST}>
            <Term label="Hint panel">
              choose &ldquo;Earn hint credits&rdquo; and confirm &ldquo;Watch ad&rdquo; to
              receive two hint credits.
            </Term>
            <Term label="Levels">
              when a level ends because you reached its mistake limit, you may watch one ad to
              get one more mistake and keep playing, up to twice per level attempt.
            </Term>
            <Term label="Daily Puzzle">
              when you missed yesterday&rsquo;s puzzle, you may watch one ad to repair that
              day so your streak continues.
            </Term>
          </ul>
          <p>
            Each offer is a button you have to press; declining costs you nothing but the
            reward.
          </p>
          <p>
            There are <B>no banner ads, no full-screen ads between puzzles and no ads when the
            app opens</B>. An ad never starts on its own. No puzzle, board size, game mode,
            level, daily or weekly puzzle, practice drill or result sits behind an ad. Each 9×9
            game includes one free hint, hint credits are also earned simply by playing, and
            the guided moves in technique packs and the practice explanations are always free.
            Mini boards, Speed Round and the variants have no hints and never show an ad.
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
              open <B>Settings → About and privacy → Ad privacy choices</B> in the app to
              reopen the consent form. The row appears wherever Google offers privacy options
              for your region.
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

        <Section icon={Send} title="6. Challenge codes you choose to share">
          <p>
            Challenge a Friend works without any server. The app turns a challenge, and later
            your result, into a short code of letters and digits. <B>The app does not send
            that code anywhere.</B> When you tap Share, it hands the text to Android&rsquo;s
            share sheet, and you decide which app and which person receives it. You can also
            copy the code yourself.
          </p>
          <ul className={LIST}>
            <Term label="A challenge invitation contains">
              which puzzle it is, the time and mistake limits you picked, and a random value
              that tells one challenge from another.
            </Term>
            <Term label="A result code also contains">
              your solving time, your number of mistakes and hints, and an identifier for that
              game, which includes the moment you started it.
            </Term>
          </ul>
          <p>
            Neither code contains your name, an account, your advertising ID, any other device
            identifier, or your location. Anyone you send a code to can read what is in it,
            and the messaging or social app you share it through handles it under its own
            privacy policy. A friend&rsquo;s result code that you paste in is stored only on
            your device.
          </p>
        </Section>

        <Section icon={Save} title="7. Backup files you choose to save">
          <p>
            <B>Settings → Your data → Save a backup file</B> writes your games in progress,
            completed games and settings into a single file and opens Android&rsquo;s share
            sheet, so you can save it wherever you like. <B>The app does not upload it
            anywhere.</B> Hint credits are not included, because they belong to the device they
            were earned on.
          </p>
          <p>
            <B>Restore from a backup</B> reads a file you pick and replaces the games, results
            and settings on that device with its contents. A backup file contains the same
            game data listed in section&nbsp;2 and nothing that identifies you; once you save
            or send it somewhere, that place handles it under its own terms.
          </p>
        </Section>

        <Section icon={Share2} title="8. Data sharing">
          <p>
            We do not sell, rent or trade personal information. We do not share your data with
            anyone for our own purposes, because we do not receive it in the first place.
          </p>
          <p>
            The only data the app itself sends anywhere is the advertising data described in
            section&nbsp;4, sent directly from the Google Mobile Ads SDK to Google. Challenge
            codes and backup files leave your device only when you share or save them yourself,
            as described in sections&nbsp;6 and&nbsp;7. Under the CCPA/CPRA, personalised advertising may be considered a
            &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information; you can opt
            out through the in-app privacy controls above or by deleting your advertising ID at
            the device level.
          </p>
          <p>
            We may disclose information if legally compelled to do so — though in practice we
            hold no user data that could be disclosed.
          </p>
        </Section>

        <Section icon={Trash2} title="9. Retention and deletion">
          <p>
            App data lives on your device for as long as the app is installed.{' '}
            <B>Uninstalling {APP} permanently deletes all of it</B> — games in progress,
            completed games, statistics, achievements, challenge results, hint credits and
            settings. Inside the app, <B>Settings → Your data → Reset all progress</B> erases
            your games, results, statistics and achievements while keeping your hint credits
            and settings. You can also erase everything without uninstalling from Android:{' '}
            <em>Settings → Apps → {APP} → Storage → Clear storage</em>.
          </p>
          <p>
            Hint credits exist only on your device. They are not linked to any account, cannot
            be transferred to another device, and cannot be restored by us after they are
            deleted.
          </p>
          <p>
            Because we hold no copy, there is nothing for us to delete on your behalf and no
            account to close. A challenge code you have already sent to someone, or a backup
            file you have saved elsewhere, is outside the app and cannot be recalled by us. To have advertising data deleted, use
            Google&rsquo;s controls at{' '}
            <A href="https://myaccount.google.com/data-and-privacy">
              myaccount.google.com/data-and-privacy
            </A>
            .
          </p>
        </Section>

        <Section icon={Lock} title="10. Security">
          <p>
            Local data is stored in the app&rsquo;s private sandbox directory, which Android
            isolates from other applications. The app makes no network requests of its own, and
            traffic between Google&rsquo;s advertising software and Google&rsquo;s servers is
            encrypted in transit (HTTPS).
          </p>
        </Section>

        <Section icon={Baby} title="11. Children">
          <p>
            {APP} is a general-audience puzzle game. It is not directed at children under 13 and
            we do not knowingly collect personal information from children — the app collects
            none from anyone. If you believe a child has provided personal information through
            an ad, contact us and we will act on it.
          </p>
        </Section>

        <Section icon={Scale} title="12. Your rights">
          <p>
            Depending on where you live, you may have the right to access, correct, delete or
            port your personal data, to object to or restrict processing, to withdraw consent,
            and to lodge a complaint with a supervisory authority.
          </p>
          <p>
            For data held on your device, you can exercise all of these directly: everything is
            visible in the app, can be taken with you as a backup file, and is removed by
            resetting your progress, uninstalling the app or clearing its storage. For
            advertising data, the controller is Google — use the consent controls in
            section&nbsp;5 or Google&rsquo;s own privacy tools. Where consent is the legal basis
            (GDPR Art.&nbsp;6(1)(a)), withdrawing it is as simple as reopening the form from{' '}
            <B>Settings</B>. You may also write to us at the address below.
          </p>
        </Section>

        <Section icon={RefreshCw} title="13. Changes to this policy">
          <p>
            If this policy changes materially, the updated version will be published at this URL
            with a new &ldquo;last updated&rdquo; date. Continued use of the app after an update
            constitutes acceptance of the revised policy. The rules for using the app are in the{' '}
            <A href="/terms/sudoku-studio">{APP} Terms of Service</A>.
          </p>
        </Section>

        <Section icon={Mail} title="14. Contact">
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
