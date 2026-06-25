'use client'

import React from 'react';
import Link from 'next/link';
import {
  Mail, Phone, MapPin, Github, Globe, Printer,
  Download, ArrowLeft, ExternalLink, GraduationCap,
  Briefcase, Code2, Star, Award, CheckCircle2,
} from 'lucide-react';
import { projects } from '@/utils/data';
import { skills }   from '@/utils/skillsData';

// ── Data ────────────────────────────────────────────────────────────────────

const CONTACT = [
  { icon: Mail,   text: 'shanisaleem17@gmail.com',        href: 'mailto:shanisaleem17@gmail.com'      },
  { icon: Phone,  text: '0345-6501771',                   href: 'tel:+923456501771'                   },
  { icon: MapPin, text: 'Lahore, Punjab, Pakistan',       href: null                                  },
  { icon: Github, text: 'github.com/SalmanSaleem-17',    href: 'https://github.com/SalmanSaleem-17'  },
  { icon: Globe,  text: 'Portfolio Website',              href: '/'                                   },
];

const EXPERIENCE_POINTS = [
  'Built and deployed 5+ production-grade web applications across FinTech and e-commerce domains',
  'Developed Goldify Pro — a live FinTech platform used by jewelers and traders across 104+ countries',
  'Engineered GoldPrice Converter with real-time precious metals APIs and multi-currency support',
  'Delivered full-stack e-commerce solution (Jewel Heaven) with custom jewelry design and cart features',
  'Implemented scalable REST APIs with Node.js/Express, MongoDB, and JWT authentication',
  'Shipped responsive, accessible UIs using React, Next.js 15, TypeScript, and Tailwind CSS',
];

const SKILL_CATEGORIES = ['Frontend', 'Backend', 'Cloud & DevOps', 'Tools'] as const;

const BAR: Record<string, { bg: string; label: string; width: string }> = {
  Expert:       { bg: 'bg-emerald-500', label: 'text-emerald-600 dark:text-emerald-400', width: 'w-[95%]' },
  Advanced:     { bg: 'bg-blue-500',    label: 'text-blue-600 dark:text-blue-400',       width: 'w-[80%]' },
  Intermediate: { bg: 'bg-amber-500',   label: 'text-amber-600 dark:text-amber-400',     width: 'w-[65%]' },
};

// ── Sub-components ───────────────────────────────────────────────────────────

function Heading({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-8 h-8 rounded-lg bg-linear-to-r from-purple-600 to-violet-600 flex items-center justify-center shrink-0 shadow-sm">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-800 dark:text-white">
        {title}
      </h2>
      <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700/70" />
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-slate-900/70 print:bg-white backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 dark:border-slate-700/40 print:border-slate-200/80 print:shadow-none shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const featured      = projects.slice(0, 4);
  const skillGroups   = SKILL_CATEGORIES.map(cat => ({
    cat,
    items: skills.filter(s => s.category === cat),
  }));

  return (
    <>
      {/* Print: page size + preserve colored elements only */}
      <style>{`
        @media print {
          @page { margin: 1.4cm; size: A4 portrait; }

          /* Preserve skill-bar colours and purple gradient icons */
          .bg-emerald-500, .bg-blue-500, .bg-amber-500,
          .from-purple-600, [class*="from-purple"] {
            -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
          }

          /* White out all card / container backgrounds */
          [class*="dark:bg-"] { background-color: white !important; }
          [class*="dark:border-"] { border-color: #e2e8f0 !important; }
          [class*="dark:text-"] { color: #1e293b !important; }

          /* Skill bar track */
          [class*="dark:bg-slate-8"] { background-color: #f1f5f9 !important; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 dark:bg-transparent print:bg-white">

        {/* ── Resume document ── */}
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-14 print:px-0 print:pt-4">

          {/* ── Navigation + action row (in-flow, hidden on print) ── */}
          <div className="print:hidden flex items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Portfolio
            </Link>
            <div className="flex items-center gap-2">
              <a
                href="/CV-Salman-Saleem.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-linear-to-r from-purple-600 to-violet-600 hover:opacity-90 transition-all shadow-md"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
            </div>
          </div>

          {/* ── HEADER ── */}
          <div className="relative bg-white dark:bg-slate-900/80 print:bg-white rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/40 print:border-slate-200/80 print:shadow-none shadow-sm mb-6">
            {/* Purple accent bar */}
            <div className="h-1.5 bg-linear-to-r from-purple-600 via-violet-500 to-purple-400" />

            <div className="p-8 flex flex-col sm:flex-row items-start gap-8 justify-between">
              {/* Name + role + tech tags */}
              <div className="flex-1">
                <h1 className="text-4xl sm:text-[2.8rem] font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-2">
                  Muhammad<br />
                  <span className="bg-linear-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                    Salman Saleem
                  </span>
                </h1>
                <p className="text-base font-bold text-slate-500 dark:text-slate-400 mb-3">
                  Full-Stack MERN Developer  ·  React.js Specialist
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS'].map(t => (
                    <span key={t}
                      className="text-[11px] px-2.5 py-0.5 rounded-full font-semibold bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact list */}
              <div className="space-y-2.5 shrink-0">
                {CONTACT.map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    {href ? (
                      <a href={href}
                        className="text-[13px] font-medium text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                        {text}
                      </a>
                    ) : (
                      <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300">{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── TWO-COLUMN BODY ── */}
          <div className="grid lg:grid-cols-[290px_1fr] gap-6 items-start">

            {/* ════════════════════════════════
                LEFT SIDEBAR
            ════════════════════════════════ */}
            <div className="space-y-5">

              {/* Summary */}
              <Card>
                <Heading icon={Star} title="Summary" />
                <p className="text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Computer Science graduate and Full-Stack MERN developer with 2+ years of freelance
                  experience. Specializing in React.js and Next.js — with a proven track record of
                  shipping production-grade FinTech and e-commerce applications from concept to deployment.
                </p>
              </Card>

              {/* Education */}
              <Card>
                <Heading icon={GraduationCap} title="Education" />
                <div className="relative pl-4 border-l-2 border-purple-400/40">
                  <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-white dark:ring-slate-900" />
                  <p className="font-bold text-[13px] text-slate-900 dark:text-white leading-snug">
                    Bachelor of Science<br />in Computer Science
                  </p>
                  <p className="text-[13px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                    COMSATS University Islamabad
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-medium">
                    Feb 2020 – Jan 2025
                  </p>
                </div>
              </Card>

              {/* Technical Skills */}
              <Card>
                <Heading icon={Code2} title="Technical Skills" />
                <div className="space-y-5">
                  {skillGroups.map(({ cat, items }) => (
                    <div key={cat}>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500 mb-2.5">
                        {cat}
                      </p>
                      <div className="space-y-2.5">
                        {items.map(skill => {
                          const b = BAR[skill.level];
                          return (
                            <div key={skill.name}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                                  {skill.name}
                                </span>
                                <span className={`text-[10px] font-bold ${b.label}`}>
                                  {skill.level}
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className={`h-full ${b.bg} ${b.width} rounded-full`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* ════════════════════════════════
                MAIN CONTENT
            ════════════════════════════════ */}
            <div className="space-y-5">

              {/* Experience */}
              <Card>
                <Heading icon={Briefcase} title="Experience" />
                <div className="relative pl-5 border-l-2 border-purple-400/40">
                  <div className="absolute -left-1.25 top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-white dark:ring-slate-900" />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-black text-[14px] text-slate-900 dark:text-white">
                        Freelance Full-Stack Developer
                      </h3>
                      <p className="text-[13px] text-purple-600 dark:text-purple-400 font-semibold">
                        Self-Employed  ·  Remote
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Jan 2023 – Present
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {EXPERIENCE_POINTS.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span className="text-[13px] text-slate-600 dark:text-slate-300 leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Featured Projects */}
              <Card>
                <Heading icon={Award} title="Featured Projects" />
                <div className="space-y-5">
                  {featured.map(p => (
                    <div key={p.id}
                      className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700/60 hover:border-purple-400 dark:hover:border-purple-500 transition-colors group">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-bold text-[13px] text-slate-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/60">
                            {p.category}
                          </span>
                          {p.status === 'Live Production' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                              Live
                            </span>
                          )}
                          {p.demoLink && (
                            <a href={p.demoLink} target="_blank" rel="noopener noreferrer"
                              aria-label={`Visit ${p.title} live site`}
                              className="print:hidden text-slate-400 hover:text-purple-500 transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.slice(0, 5).map(t => (
                          <span key={t}
                            className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* ── Footer CTAs (hidden on print) ── */}
          <div className="print:hidden mt-8 flex flex-wrap items-center justify-center gap-3 pt-8 border-t border-slate-200/60 dark:border-slate-700/60">
            <Link href="/"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
              <ArrowLeft className="w-4 h-4" /> Portfolio
            </Link>
            <a
              href="/CV-Salman-Saleem.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </a>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-linear-to-r from-purple-600 to-violet-600 hover:opacity-90 transition-all shadow-lg"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
