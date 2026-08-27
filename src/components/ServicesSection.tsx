'use client'

import { memo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LineChart, ShoppingBag, Calculator, Server, Smartphone, ArrowUpRight } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animations';
import SectionBadge from '@/components/projects/SectionBadge';

// Positioned from real project categories: FinTech (Goldify, GoldPrice),
// E-commerce (Jewel Heaven), SaaS tools (Premium Converters, ScaleRecipe),
// Android apps (Goldify on Google Play).
const SERVICES = [
  {
    icon: LineChart,
    title: 'FinTech Platforms',
    desc: 'Real-time pricing engines, multi-currency valuation, and interactive analytics dashboards built for accuracy and scale.',
    tags: ['Real-time APIs', 'Charts', 'JWT Auth'],
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce Solutions',
    desc: 'Storefronts, carts, secure checkout, custom product flows, and admin dashboards from concept to deployment.',
    tags: ['Stripe', 'Cart & Orders', 'Admin'],
  },
  {
    icon: Calculator,
    title: 'SaaS Tools & Calculators',
    desc: 'Multi-tool platforms and converters with 150+ utilities, full localization, and a privacy-first architecture.',
    tags: ['Next.js', 'i18n', 'SSR'],
  },
  {
    icon: Server,
    title: 'APIs & Backends',
    desc: 'Scalable REST APIs, authentication, database modeling, and cloud deployment on Vercel and Render.',
    tags: ['Node / Express', 'MongoDB', 'REST'],
  },
  {
    icon: Smartphone,
    title: 'Android App Development',
    desc: 'Cross-platform mobile apps built and shipped end to end — from React Native build to a live Google Play listing.',
    tags: ['React Native', 'Expo', 'Play Store'],
    href: '/projects/goldify-android-app',
    hrefLabel: 'See Goldify on Android',
  },
] as const;

const ServicesSection = memo(() => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={containerVariants}
    className="max-w-6xl mx-auto"
  >
    <SectionBadge
      label="What I do"
      title="What I Build"
      description="From production FinTech platforms and full-stack SaaS tools to Android apps on Google Play — end-to-end, from architecture to store listing."
      itemVariants={itemVariants}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
      {SERVICES.map(({ icon: Icon, title, desc, tags, ...rest }, i) => (
        <motion.div
          key={title}
          variants={itemVariants}
          className={[
            'group relative rounded-2xl p-6 border border-white/40 dark:border-slate-700/40 shadow-lg',
            'backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden',
            i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
          ].join(' ')}
          style={{ background: 'var(--card-bg)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md mb-4">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span key={t} className="text-[11px] font-semibold px-2.5 py-1 rounded-full
                bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-300
                border border-purple-100 dark:border-purple-900/40">
                {t}
              </span>
            ))}
          </div>

          {'href' in rest && rest.href && (
            <Link href={rest.href}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-bold
                text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-200 transition-colors">
              {rest.hrefLabel}
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          )}
        </motion.div>
      ))}
    </div>
  </motion.div>
));
ServicesSection.displayName = 'ServicesSection';
export default ServicesSection;
