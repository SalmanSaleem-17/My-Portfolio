'use client'

import { memo } from 'react';
import { motion } from 'framer-motion';
import { LineChart, ShoppingBag, Calculator, Server } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animations';
import SectionBadge from '@/components/projects/SectionBadge';

// Positioned from real project categories: FinTech (Goldify, GoldPrice),
// E-commerce (Jewel Heaven), SaaS tools (Smart Unit Converters, ScaleRecipe).
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
      description="From production FinTech platforms to full-stack SaaS tools — end-to-end, from architecture to deployment."
      itemVariants={itemVariants}
    />

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {SERVICES.map(({ icon: Icon, title, desc, tags }) => (
        <motion.div
          key={title}
          variants={itemVariants}
          className="group relative rounded-2xl p-6 border border-white/40 dark:border-slate-700/40 shadow-lg
            backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl overflow-hidden"
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
        </motion.div>
      ))}
    </div>
  </motion.div>
));
ServicesSection.displayName = 'ServicesSection';
export default ServicesSection;
