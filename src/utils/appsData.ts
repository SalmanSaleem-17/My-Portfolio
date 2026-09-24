// src/utils/appsData.ts
// Published Android apps, as listed on Google Play under the developer account
// "Muhammad Salman Saleem" (ID 4945636568810127963).
//
// Everything here is taken from the live store listings — taglines, feature copy,
// icons and screenshots — so the portfolio never drifts from what visitors
// actually see on Play. Apps still in closed testing are deliberately left out:
// a card nobody can install is worse than no card.
//
// The art is copied into /public/apps rather than hot-linked from Play's CDN:
// Google throttles repeated cross-origin image loads and can rotate those URLs
// at any time, which left most of the strip rendering as broken images.

// Note: the /store/apps/dev?id=<numeric id> form 404s for this account —
// /store/apps/developer?id=<developer name> is the page that actually resolves.
export const PLAY_DEVELOPER_URL =
  'https://play.google.com/store/apps/developer?id=Muhammad+Salman+Saleem'

export interface PlayApp {
  /** Android package name — also the stable React key. */
  packageId: string
  name: string
  /** Play's own short "promo" line, verbatim. */
  tagline: string
  /** One paragraph, adapted from the listing's "About this app". */
  summary: string
  playUrl: string
  /** Play Store category. */
  category: string
  /** Verified facts from the listing; rendered as chips. */
  chips: string[]
  /** Four strongest capabilities, drawn from the listing's feature list. */
  highlights: string[]
  /** 192x192 PNG under /public/apps. */
  icon: string
  /** 480x1040 JPEGs under /public/apps, in listing order. */
  screenshots: Array<{ src: string; alt: string }>
  /** Internal case-study route, when one exists. */
  caseStudy?: string
  /** Slug of the web project this app ships alongside, if any — lets that
   *  project's card offer the store listing without hardcoding a package id. */
  webProjectSlug?: string
  /** Accent used for the card's rail and icon glow. */
  accent: { from: string; to: string }
  /** Human label for the card. */
  lastUpdated: string
  /** Same date, ISO 8601, for schema.org dateModified. */
  updatedISO: string
}

export const playApps: PlayApp[] = [
  {
    packageId: 'com.goldify.pro',
    name: 'Goldify: Gold Rate & Converter',
    tagline: 'Live gold rate & price, gold converter & calculator — 24K/22K, tola to gram',
    summary:
      'The complete gold toolkit for jewellers and traders: live rates for 100+ countries with automatic country detection, a universal weight converter covering both metric and traditional units, karat and purity calculators, and jewellery shop records — all in one offline-capable app.',
    playUrl: 'https://play.google.com/store/apps/details?id=com.goldify.pro',
    category: 'Finance',
    chips: ['React Native', 'Expo', '100+ countries', 'Works offline'],
    highlights: [
      'Live 24K and 22K rates per gram, tola and ounce, with your country detected automatically',
      'Universal converter — troy ounce, gram, kilogram, tola, masha, ratti, tael, pennyweight, grain',
      'Karat purity checker, impurity calculator and money-to-gold conversion at any rate',
      'Jewellery shop management: sale records, customer details, balances and suppliers',
    ],
    icon: '/apps/goldify-icon.png',
    screenshots: [
      { src: '/apps/goldify-1.jpg',
        alt: 'Goldify home screen showing the live gold rate per tola and per gram' },
      { src: '/apps/goldify-2.jpg',
        alt: 'Goldify gold converters list including karat purity and polish calculators' },
      { src: '/apps/goldify-3.jpg',
        alt: 'Goldify money-to-gold calculator converting an amount into gold weight' },
      { src: '/apps/goldify-4.jpg',
        alt: 'Goldify quick gold rate tables across karats and weights' },
    ],
    caseStudy: '/projects/goldify-android-app',
    webProjectSlug: 'goldify-pro',
    accent: { from: '#B8860B', to: '#F5B301' },
    lastUpdated: 'September 10, 2026',
    updatedISO: '2026-09-10',
  },
  {
    packageId: 'com.premiumconverters.landarea',
    name: 'Land Calc: Area Tools & Split',
    tagline: 'Plot area calculator & land unit converter — Marla, Kanal, Acre, sq ft, Split',
    summary:
      'A land area calculator and unit converter for property buyers, dealers and surveyors. Measure any plot from its side lengths, add and subtract parcels, split land into shares, partition a plot with a to-scale map, and export professional PDF reports — in eight languages, fully offline.',
    playUrl: 'https://play.google.com/store/apps/details?id=com.premiumconverters.landarea',
    category: 'Tools',
    chips: ['Works offline', '8 languages', 'RTL support', 'PDF reports'],
    highlights: [
      'Plot area for rectangle, 3, 4, 5 and 6-sided plots, with the real formula shown step by step',
      'Plot partition with a to-scale map — 2 to 10 parts, each with equal area and equal road frontage',
      'Marla, Kanal, Acre and Killa alongside regional units for Pakistan, India, Bangladesh and Nepal',
      'Professional PDF reports in 8 languages, with full right-to-left layout for Urdu and Arabic',
    ],
    icon: '/apps/landcalc-icon.png',
    screenshots: [
      { src: '/apps/landcalc-1.jpg',
        alt: 'Land Calc plot area calculator with side lengths entered' },
      { src: '/apps/landcalc-2.jpg',
        alt: 'Land Calc showing a calculated plot area with a compass diagram' },
      { src: '/apps/landcalc-3.jpg',
        alt: 'Land Calc plot partition map dividing a plot into numbered equal parts' },
      { src: '/apps/landcalc-4.jpg',
        alt: 'Land Calc land unit converter across Marla, Kanal, Acre and square feet' },
    ],
    accent: { from: '#15803D', to: '#4ADE80' },
    lastUpdated: 'September 15, 2026',
    updatedISO: '2026-09-15',
  },
]

export default playApps
