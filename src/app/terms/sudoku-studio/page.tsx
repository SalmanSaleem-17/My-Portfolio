// src/app/terms/sudoku-studio/page.tsx
// Terms of Service for the Sudoku Studio Android app. Linked from the app's
// Settings → Terms of service row and from the Google Play Console
// (App content → Trader status and Terms of Service).
//
// Static server component — no interactivity, so it renders and caches as HTML.

import type { Metadata } from 'next'
import {
  FileText, Smartphone, Gift, Megaphone, Ban, Copyright, Wrench,
  TriangleAlert, Scale, Power, Gavel, RefreshCw, Mail,
} from 'lucide-react'
import { SITE } from '@/utils/seo'
import JsonLd from '@/components/JsonLd'
import { A, B, LIST, LegalPage, Section, Term } from '@/components/legal/LegalPrimitives'

const url = `${SITE.url}/terms/sudoku-studio`
const APP = 'Sudoku Studio'
const PACKAGE = 'com.sudoku.studio'
const CONTACT = 'contact@salmansaleem.dev'
const EFFECTIVE = 'November 22, 2026'

export const metadata: Metadata = {
  title: `${APP} Terms of Service`,
  description: `Terms of Service for ${APP}, the offline classic 9×9 Sudoku game for Android: your licence to use the app, how hint credits and optional rewarded ads work, acceptable use, and the limits of our liability.`,
  alternates: { canonical: url },
  openGraph: {
    title: `${APP} — Terms of Service`,
    description: `The rules for using ${APP}: a free, offline Sudoku game with optional rewarded ads and hint credits that stay on your device.`,
    url,
    siteName: SITE.name,
    type: 'article',
  },
  robots: { index: true, follow: true },
}

export default function SudokuStudioTermsPage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': `${url}/#webpage`,
          url,
          name: `${APP} — Terms of Service`,
          description: `Terms of Service for the ${APP} Android application.`,
          inLanguage: SITE.language,
          isPartOf: { '@id': `${SITE.url}/#website` },
          datePublished: '2026-11-22',
          dateModified: '2026-11-22',
          publisher: { '@id': `${SITE.url}/#person` },
        }}
      />

      <LegalPage
        app={APP}
        document="Terms of Service"
        effective={EFFECTIVE}
        appliesTo={
          <>
            Applies to {APP} (<code className="font-mono">{PACKAGE}</code>) on Google Play.
          </>
        }
        summary={
          <>
            {APP} is a free Sudoku game you play on your own device. You may use it for
            personal enjoyment; please do not copy, resell or tamper with it. Hint credits are
            an in-game convenience with no cash value, and they live only on your device. The
            app is provided as it is, without guarantees. Your legal rights as a consumer are
            not reduced by anything here.
          </>
        }
        caption={`${APP} · Classic 9×9 Sudoku · Plays completely offline`}
      >
        <Section icon={FileText} title="1. Agreement to these terms">
          <p>
            These Terms of Service are an agreement between you and {SITE.legalName}
            {' '}(&ldquo;we&rdquo;, &ldquo;us&rdquo;), the developer of {APP}. By installing or
            using the app you agree to them. If you do not agree, please do not use the app.
          </p>
          <p>
            Your use of the app is also subject to the{' '}
            <A href="/privacy/sudoku-studio">{APP} Privacy Policy</A>, and your download from
            Google Play is subject to Google Play&rsquo;s own terms.
          </p>
        </Section>

        <Section icon={Smartphone} title="2. The app and your licence">
          <p>
            {APP} is a single-player, classic 9×9 Sudoku game. It needs no account and works
            without an internet connection.
          </p>
          <p>
            We grant you a personal, non-exclusive, non-transferable, revocable licence to
            install and use the app on Android devices you own or control, for your own
            non-commercial use. The app is licensed to you, not sold.
          </p>
        </Section>

        <Section icon={Gift} title="3. Hints and hint credits">
          <ul className={LIST}>
            <Term label="Free hints">
              every puzzle includes one free step-by-step hint, and the practice explanations
              are always free.
            </Term>
            <Term label="Earning credits">
              you can choose to watch one rewarded video ad to receive two hint credits. One
              credit reveals one further hint. Credits are added only when the ad provider
              confirms the reward was earned; closing an ad early earns nothing.
            </Term>
            <Term label="No cash value">
              hint credits are a feature of the game, not money or property. They cannot be
              bought, sold, exchanged, refunded or redeemed for anything outside the app.
            </Term>
            <Term label="Stored on your device only">
              credits are not linked to an account and are not held on any server. They cannot
              be moved to another device, and they are permanently lost if you uninstall the
              app or clear its data. We are unable to restore them.
            </Term>
            <Term label="Availability of ads">
              rewarded ads depend on Google, your connection and your privacy choices, and may
              not always be available. We do not promise that an ad, or the chance to earn
              credits, will be offered at any particular time.
            </Term>
          </ul>
          <p>
            We may change how hints and credits work in a future version of the app, for
            example how many credits an ad grants.
          </p>
        </Section>

        <Section icon={Megaphone} title="4. Advertising and third-party services">
          <p>
            The only ads in {APP} are the optional rewarded videos described above, served by{' '}
            <B>Google AdMob</B>. We do not control the content of those ads and are not
            responsible for the products, services or websites they promote. Anything you do
            with an advertiser is between you and that advertiser.
          </p>
          <p>
            How advertising data is handled, and how to change your ad choices, is explained in
            the <A href="/privacy/sudoku-studio">Privacy Policy</A>.
          </p>
        </Section>

        <Section icon={Ban} title="5. Acceptable use">
          <p>You agree not to:</p>
          <ul className={LIST}>
            <li>copy, resell, rent, sublicense or redistribute the app or any part of it;</li>
            <li>
              reverse engineer, decompile or modify the app, except where the law gives you
              that right regardless of these terms;
            </li>
            <li>
              interfere with the advertising in the app, including using automated means to
              request, view or click ads, or tampering with how rewards are granted;
            </li>
            <li>use the app in any way that breaks the law.</li>
          </ul>
        </Section>

        <Section icon={Copyright} title="6. Intellectual property">
          <p>
            The app, including its design, code, artwork, icon, text and its collection of
            puzzles, belongs to us or our licensors and is protected by copyright and other
            laws. These terms give you no rights in it beyond the licence in section&nbsp;2.
            Android and Google Play are trademarks of Google LLC.
          </p>
        </Section>

        <Section icon={Wrench} title="7. Updates and availability">
          <p>
            We may update the app to fix problems, add or remove features, or keep it
            compatible with new versions of Android. We may also stop offering or supporting
            the app at any time. We are not obliged to provide any particular update, and an
            update may be required for the app to keep working on your device.
          </p>
        </Section>

        <Section icon={TriangleAlert} title="8. No warranty">
          <p>
            {APP} is provided <B>&ldquo;as is&rdquo; and &ldquo;as available&rdquo;</B>, free of
            charge and for entertainment. To the fullest extent the law allows, we make no
            promises that it will be error-free, uninterrupted, or fit for any particular
            purpose, or that your saved progress, statistics or hint credits will never be
            lost. Hints are generated by the app&rsquo;s own logic and are offered as a playing
            aid only.
          </p>
        </Section>

        <Section icon={Scale} title="9. Limitation of liability">
          <p>
            To the fullest extent the law allows, we are not liable for any indirect,
            incidental or consequential loss arising from your use of the app, or for the loss
            of game data or hint credits. Because the app is free, our total liability to you
            for any claim relating to it is limited to the amount you paid us for it, if any.
          </p>
          <p>
            <B>Nothing in these terms limits or excludes any right you have under consumer
            protection law that cannot lawfully be limited or excluded</B>, or our liability
            where the law does not allow it to be limited.
          </p>
        </Section>

        <Section icon={Power} title="10. Ending these terms">
          <p>
            You can end this agreement at any time by uninstalling the app. Your licence ends
            automatically if you break these terms, in which case you must stop using the app
            and remove it from your devices. Sections&nbsp;6, 8, 9 and 11 continue to apply
            after the agreement ends.
          </p>
        </Section>

        <Section icon={Gavel} title="11. Governing law">
          <p>
            These terms are governed by the laws of {SITE.location.country}. If you are a
            consumer, you also keep the protection of any mandatory laws of the country where
            you live, and you may bring a claim in the courts of that country where the law
            gives you that right.
          </p>
        </Section>

        <Section icon={RefreshCw} title="12. Changes to these terms">
          <p>
            We may revise these terms from time to time. The updated version will be published
            at this URL with a new effective date. Continued use of the app after an update
            constitutes acceptance of the revised terms.
          </p>
        </Section>

        <Section icon={Mail} title="13. Contact">
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
