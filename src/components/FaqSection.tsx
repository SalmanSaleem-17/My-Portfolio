'use client'

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { containerVariants, itemVariants } from '@/utils/animations';
import SectionBadge from '@/components/projects/SectionBadge';
import JsonLd from '@/components/JsonLd';

// Answers double as the visible copy AND the FAQPage schema — Google requires
// the structured-data text to match what users see.
const FAQS = [
  {
    q: 'Are you available for freelance or contract work?',
    a: "Yes — I'm available for freelance and contract projects, remote worldwide. You can reach me through the contact form on this site or at contact@salmansaleem.dev.",
  },
  {
    q: "What's your tech stack?",
    a: 'I specialize in the MERN stack — React.js, Next.js, Node.js, Express and MongoDB — with TypeScript and Tailwind CSS. I build full-stack applications end to end, from API and database to a polished UI.',
  },
  {
    q: 'Do you work remotely with international clients?',
    a: "Yes. I'm based in Lahore, Pakistan and work fully remotely with clients across 100+ countries, adapting to your timezone and preferred tools.",
  },
  {
    q: 'What kinds of projects do you build?',
    a: 'Production-grade web applications — FinTech platforms, e-commerce stores, SaaS tools and calculators, and scalable REST APIs and backends.',
  },
  {
    q: "What's a typical project timeline?",
    a: "It depends on scope. A focused feature or landing site can take 1–2 weeks, while a full-stack application typically runs 1–3 months. I'll give you a clear estimate after we discuss requirements.",
  },
  {
    q: 'How do we get started?',
    a: "Send me a message through the contact form with a short description of your project. I'll reply within 24 hours to discuss scope, timeline and next steps.",
  },
] as const;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const FaqSection = memo(() => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.1 }}
    variants={containerVariants}
    className="max-w-3xl mx-auto"
  >
    <JsonLd data={faqSchema} />

    <SectionBadge
      label="Good to know"
      title="Frequently Asked Questions"
      description="Quick answers to what most people ask before reaching out."
      itemVariants={itemVariants}
    />

    <div className="space-y-3">
      {FAQS.map((f) => (
        <motion.details
          key={f.q}
          variants={itemVariants}
          className="group rounded-2xl border border-white/40 dark:border-slate-700/40 shadow-md backdrop-blur-sm overflow-hidden"
          style={{ background: 'var(--card-bg)' }}
        >
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 sm:px-6 py-4
            text-slate-900 dark:text-white font-semibold text-sm sm:text-base select-none">
            {f.q}
            <ChevronDown className="w-5 h-5 shrink-0 text-purple-500 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="px-5 sm:px-6 pb-5 -mt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {f.a}
          </div>
        </motion.details>
      ))}
    </div>
  </motion.div>
));
FaqSection.displayName = 'FaqSection';
export default FaqSection;
