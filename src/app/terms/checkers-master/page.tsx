// src/app/terms/checkers-master/page.tsx
// Terms of Service for the Checkers Master: Draughts Android app. Linked from the
// app's privacy policy and from the Google Play Console (App content → Trader
// status and Terms of Service).
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import {
  FileText, Smartphone, Coins, Trophy, Megaphone, Ban, Copyright, Wrench,
  TriangleAlert, Scale, Power, Gavel, RefreshCw, Mail,
} from 'lucide-react'
import { SITE } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'
import { amber } from '@/components/legal/LegalPrimitives'

const { A, B, LIST, LegalPage, Section, Term } = amber

const url = `${SITE.url}/terms/checkers-master`
const APP = 'Checkers Master'
const FULL = 'Checkers Master: Draughts'
const PACKAGE = 'com.checkersmaster.draughts'
const CONTACT = 'contact@salmansaleem.dev'
const EFFECTIVE = 'November 27, 2026'

export const metadata: Metadata = {
  title: `${APP} Terms of Service`,
  description: `Terms of Service for ${FULL}, the offline checkers and draughts game for Android: your licence to use the app, how coins, board and piece sets and optional reward ads work, acceptable use, and the limits of our liability.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Terms of Service`,
    description: `The rules for using ${APP}: a free, offline checkers game with coins, board and piece sets and optional reward ads that all stay on your device.`,
    url,
    siteName: SITE.name,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

export default function CheckersMasterTermsPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}/#webpage`,
          url,
          name: `${APP} — Terms of Service`,
          description: `Terms of Service for the ${FULL} Android application.`,
          inLanguage: SITE.language,
          isPartOf: { '@id': `${SITE.url}/#website` },
          datePublished: '2026-11-27',
          dateModified: '2026-11-27',
          publisher: { '@id': `${SITE.url}/#person` },
        }}
      />

      <LegalPage
        app={APP}
        document="Terms of Service"
        effective={EFFECTIVE}
        appliesTo={
          <>
            Applies to {FULL} (<code className="font-mono">{PACKAGE}</code>) on Google Play.
          </>
        }
        summary={
          <>
            {FULL} (&ldquo;{APP}&rdquo;) is a free checkers and draughts game you play on your
            own device. You may use it for personal enjoyment; please do not copy, resell or
            tamper with it. Coins, board and piece sets, hints, statistics and achievements
            are part of the game, cannot be bought with money, have no cash value, and live
            only on your device. The app is provided as it is, without guarantees. Your legal
            rights as a consumer are not reduced by anything here.
          </>
        }
        caption={`${FULL} · 9 rule variants · Plays completely offline`}
      >
        <Section icon={FileText} title="1. Agreement to these terms">
          <p>
            These Terms of Service are an agreement between you and {SITE.legalName}
            {' '}(&ldquo;we&rdquo;, &ldquo;us&rdquo;), the developer of {APP}. By installing or
            using the app you agree to them. If you do not agree, please do not use the app.
          </p>
          <p>
            Your use of the app is also subject to the{' '}
            <A href="/privacy/checkers-master">{APP} Privacy Policy</A>, and your download
            from Google Play is subject to Google Play&rsquo;s own terms.
          </p>
        </Section>

        <Section icon={Smartphone} title="2. The app and your licence">
          <p>
            {APP} is a checkers and draughts game. It includes nine rule variants, a computer
            opponent at seven levels of difficulty, two-player games on one device, lessons, a
            tactics trainer, practice positions, puzzles, a daily challenge, a campaign, and a
            review of your finished games. It needs no account and works without an internet
            connection.
          </p>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable licence to
            install and use the app on Android devices you own or control, for your own
            non-commercial use. The app is licensed to you, not sold.
          </p>
        </Section>

        <Section icon={Coins} title="3. Coins, boards, pieces, hints and undos">
          <ul className={LIST}>
            <Term label="Nothing is sold for money">
              the app has no in-app purchases. Coins, board sets, piece sets, hints and undos
              cannot be bought with real money, by you or from you.
            </Term>
            <Term label="Earning coins by playing">
              coins are paid for games against the computer, most for a win and more at harder
              levels, and for the daily bonus, the daily puzzle, campaign stars and
              achievements. A game that is called off or resigned early pays nothing.
            </Term>
            <Term label="Earning coins from ads">
              you can choose to watch a reward video for a small number of coins, at most once
              an hour, and to double the coins from a finished game or from the daily bonus.
              Coins are added only when the ad provider confirms the reward was earned;
              closing an ad early earns nothing.
            </Term>
            <Term label="What coins buy">
              board sets, piece sets, and extra hints and undos, at the prices shown in the
              app.
            </Term>
            <Term label="Sets earned by playing">
              some board and piece sets are not for sale. They are given for finishing
              lessons, winning practice positions and beating the computer at each level, as
              described on each set in the app.
            </Term>
            <Term label="Hints and undos">
              you start with a small number of each. When you run out during a game you can
              get one more with coins, or by choosing to watch a reward video, up to three
              times a day for each. Practice games do not use them up.
            </Term>
            <Term label="Trying a set">
              a reward video can let you play one game with a board or piece set you do not
              hold. It is yours for that game only.
            </Term>
            <Term label="No cash value">
              coins, sets, hints and undos are features of the game, not money or property.
              They cannot be sold, exchanged, refunded or redeemed for anything outside the
              app.
            </Term>
            <Term label="Stored on your device only">
              they are not linked to an account and are not held on any server. They cannot be
              moved to another device, and they are permanently lost if you uninstall the app,
              clear its data, or use <B>Reset all data</B>. We are unable to restore them.
            </Term>
            <Term label="Availability of ads">
              reward videos depend on Google, your connection and your privacy choices, and
              may not always be available. We do not promise that an ad, or the reward that
              goes with it, will be offered at any particular time.
            </Term>
          </ul>
          <p>
            We may change prices, rewards, limits and the goals that earn a set in a future
            version of the app. A set you already hold stays yours on that device.
          </p>
        </Section>

        <Section icon={Trophy} title="4. Games, statistics and achievements">
          <ul className={LIST}>
            <Term label="The computer opponent">
              the opponent, the hints and the grading of your moves are produced by the
              app&rsquo;s own analysis on your device. They are a playing aid and are not
              guaranteed to be the best possible play.
            </Term>
            <Term label="Rules of the variants">
              the app follows its own statement of each variant&rsquo;s rules, shown under{' '}
              <B>How to Play</B>. Rules for these traditional games differ between countries,
              clubs and federations, and the app&rsquo;s version may not match the one you
              know.
            </Term>
            <Term label="Two-player games">
              games for two players are played on one device. There is no online play, and we
              take no part in games between players.
            </Term>
            <Term label="No cash value">
              results, statistics, streaks, stars, progress and achievements are for your own
              enjoyment. They have no monetary value, are stored only on your device, and are
              lost if you uninstall the app or clear its data.
            </Term>
          </ul>
        </Section>

        <Section icon={Megaphone} title="5. Advertising and third-party services">
          <p>
            {APP} is free because it shows ads, served by <B>Google AdMob</B>: a banner on the
            bottom navigation bar, a labelled card in the puzzle list, an occasional
            full-screen ad after a finished match or when you return to the app, and the
            optional reward videos described above. No ad interrupts a game in progress. We do
            not control the content of those ads and are not responsible for the products,
            services or websites they promote. Anything you do with an advertiser is between
            you and that advertiser.
          </p>
          <p>
            How advertising data is handled, and how to change your ad choices, is explained
            in the <A href="/privacy/checkers-master">Privacy Policy</A>.
          </p>
        </Section>

        <Section icon={Ban} title="6. Acceptable use">
          <p>You agree not to:</p>
          <ul className={LIST}>
            <li>copy, resell, rent, sublicense or redistribute the app or any part of it;</li>
            <li>
              reverse engineer, decompile or modify the app, except where the law gives you
              that right regardless of these terms;
            </li>
            <li>
              interfere with the advertising in the app, including using automated means to
              request, view or click ads, or tampering with how coins and rewards are granted;
            </li>
            <li>use the app in any way that breaks the law.</li>
          </ul>
        </Section>

        <Section icon={Copyright} title="7. Intellectual property">
          <p>
            The app, including its design, code, artwork, icon, text, lessons and puzzles,
            belongs to us or our licensors and is protected by copyright and other laws. These
            terms give you no rights in it beyond the licence in section&nbsp;2. Checkers and
            draughts themselves are traditional games that belong to no one. Android and
            Google Play are trademarks of Google LLC.
          </p>
        </Section>

        <Section icon={Wrench} title="8. Updates and availability">
          <p>
            We may update the app to fix problems, add or remove features or game modes, or
            keep it compatible with new versions of Android. While the app is offered as an
            early-access release, changes may be more frequent. We may also stop offering or
            supporting the app at any time. We are not obliged to provide any particular
            update, and an update may be required for the app to keep working on your device.
          </p>
        </Section>

        <Section icon={TriangleAlert} title="9. No warranty">
          <p>
            {APP} is provided <B>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</B>, free of
            charge and for entertainment. To the fullest extent the law allows, we make no
            promises that it will be error-free, uninterrupted, or fit for any particular
            purpose, or that your saved games, progress, statistics, coins or sets will never
            be lost.
          </p>
        </Section>

        <Section icon={Scale} title="10. Limitation of liability">
          <p>
            To the fullest extent the law allows, we are not liable for any indirect,
            incidental or consequential loss arising from your use of the app, or for the loss
            of game data, coins or sets. Because the app is free, our total liability to you
            for any claim relating to it is limited to the amount you paid us for it, if any.
          </p>
          <p>
            <B>Nothing in these terms limits or excludes any right you have under consumer
            protection law that cannot lawfully be limited or excluded</B>, or our liability
            where the law does not allow it to be limited.
          </p>
        </Section>

        <Section icon={Power} title="11. Ending these terms">
          <p>
            You can end this agreement at any time by uninstalling the app. Your licence ends
            automatically if you break these terms, in which case you must stop using the app
            and remove it from your devices. Sections&nbsp;7, 9, 10 and 12 continue to apply
            after the agreement ends.
          </p>
        </Section>

        <Section icon={Gavel} title="12. Governing law">
          <p>
            These terms are governed by the laws of {SITE.location.country}. If you are a
            consumer, you also keep the protection of any mandatory laws of the country where
            you live, and you may bring a claim in the courts of that country where the law
            gives you that right.
          </p>
        </Section>

        <Section icon={RefreshCw} title="13. Changes to these terms">
          <p>
            We may revise these terms from time to time. The updated version will be published
            at this URL with a new &ldquo;last updated&rdquo; date. Continued use of the app
            after an update constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section icon={Mail} title="14. Contact">
          <p>
            Questions about these terms or about {APP}:{' '}
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
