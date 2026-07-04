'use client'

import { memo, useEffect, useRef, useState } from 'react';
import { Rocket, Globe, Wrench, Users } from 'lucide-react';

// Impact metrics — all sourced from real project data (5 apps, 100+ countries,
// 159+ tools in Premium Converters, millions of users on GoldPrice Converter).
const STATS = [
  { target: 5,   suffix: '+',  label: 'Projects Shipped',  icon: Rocket },
  { target: 100, suffix: '+',  label: 'Countries Reached', icon: Globe  },
  { target: 159, suffix: '+',  label: 'Tools Built',        icon: Wrench },
  { target: 1,   suffix: 'M+', label: 'Users Served',       icon: Users  },
] as const;

function useCountUp(target: number, active: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let startTs = 0;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

const StatCard = memo(({ stat, active }: { stat: (typeof STATS)[number]; active: boolean }) => {
  const value = useCountUp(stat.target, active);
  const Icon = stat.icon;
  return (
    <div className="group relative flex flex-col items-center text-center gap-3 rounded-2xl p-6 sm:p-7
      border border-white/40 dark:border-slate-700/40 shadow-lg backdrop-blur-sm
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ background: 'var(--card-bg)' }}>
      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-md shrink-0">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-4xl sm:text-5xl font-black tracking-tight
        bg-linear-to-r from-purple-600 to-violet-500 dark:from-purple-400 dark:to-violet-300 bg-clip-text text-transparent">
        {value}{stat.suffix}
      </div>
      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.label}</div>
    </div>
  );
});
StatCard.displayName = 'StatCard';

const StatsSection = memo(() => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="max-w-6xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </div>
  );
});
StatsSection.displayName = 'StatsSection';
export default StatsSection;
