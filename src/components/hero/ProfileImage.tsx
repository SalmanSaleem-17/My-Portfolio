'use client'

import React from 'react';
import Image from 'next/image';
import { FLOATING_ICONS } from './types';

interface ProfileImageProps {
  isLoaded: boolean;
  isMobile?: boolean;
}

// Desktop: 6 badge icons on the orbit ring of a 460px container
const DESKTOP_BADGE_POSITIONS: React.CSSProperties[] = [
  { top: '8%',  left: '50%', transform: 'translateX(-50%)' }, // 12 o'clock
  { top: '23%', right: '4%'                                 }, // 2 o'clock
  { top: '63%', right: '4%'                                 }, // 4 o'clock
  { top: '84%', left: '50%', transform: 'translateX(-50%)' }, // 6 o'clock
  { top: '63%', left: '4%'                                  }, // 8 o'clock
  { top: '23%', left: '4%'                                  }, // 10 o'clock
];

// Mobile: 4 badge icons
const MOBILE_BADGE_POSITIONS: React.CSSProperties[] = [
  { top: '7%',  left: '50%', transform: 'translateX(-50%)' },
  { top: '36%', right: '3%'                                 },
  { top: '57%', right: '3%'                                 },
  { top: '86%', left: '50%', transform: 'translateX(-50%)' },
];

// 5 colorful floating shapes matching the reference image
interface ColorShape {
  style:    React.CSSProperties;
  gradient: string;
  shape:    string;
  anim:     string;
  dur:      string;
  delay:    string;
  opacity:  number;
}

const COLOR_SHAPES: ColorShape[] = [
  // Pink circle — top-left
  {
    style:    { top: '-20px', left: '-28px', width: '50px', height: '50px' },
    gradient: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
    shape:    'rounded-full',
    anim:     'animate-float',
    dur:      '4.2s', delay: '0s', opacity: 0.90,
  },
  // Pink → orange tilted rounded rect — top-right
  {
    style:    { top: '-12px', right: '-40px', width: '58px', height: '46px', transform: 'rotate(12deg)' },
    gradient: 'linear-gradient(135deg, #f472b6 0%, #fb923c 100%)',
    shape:    'rounded-2xl',
    anim:     'animate-float-reverse',
    dur:      '5s', delay: '0.5s', opacity: 0.85,
  },
  // Blue rounded square — mid-right
  {
    style:    { top: '37%', right: '-42px', width: '46px', height: '46px', transform: 'rotate(-8deg)' },
    gradient: 'linear-gradient(135deg, #60a5fa 0%, #4f46e5 100%)',
    shape:    'rounded-xl',
    anim:     'animate-float',
    dur:      '6s', delay: '1s', opacity: 0.80,
  },
  // Teal rounded square — bottom-right
  {
    style:    { bottom: '10%', right: '-34px', width: '38px', height: '38px', transform: 'rotate(10deg)' },
    gradient: 'linear-gradient(135deg, #2dd4bf 0%, #34d399 100%)',
    shape:    'rounded-xl',
    anim:     'animate-float-reverse',
    dur:      '4.5s', delay: '1.5s', opacity: 0.75,
  },
  // Lavender / blue circle — bottom-left
  {
    style:    { bottom: '-18px', left: '-28px', width: '54px', height: '54px' },
    gradient: 'linear-gradient(135deg, #93c5fd 0%, #a78bfa 100%)',
    shape:    'rounded-full',
    anim:     'animate-float',
    dur:      '5.5s', delay: '0.8s', opacity: 0.78,
  },
];

const ProfileImage: React.FC<ProfileImageProps> = ({ isLoaded, isMobile = false }) => {
  const icons     = isMobile ? FLOATING_ICONS.slice(0, 4) : FLOATING_ICONS;
  const positions = isMobile ? MOBILE_BADGE_POSITIONS : DESKTOP_BADGE_POSITIONS;

  const containerCls = isMobile ? 'w-[340px] h-[340px]' : 'w-[460px] h-[460px]';
  const photoCls     = isMobile ? 'w-[218px] h-[218px]' : 'w-[290px] h-[290px]';

  return (
    <div className="relative flex items-center justify-center">
      <div className={`relative ${containerCls} flex items-center justify-center`}>

        {/* ── Colorful floating shapes (desktop only) ───────────────────── */}
        {!isMobile && COLOR_SHAPES.map((s, i) => (
          <div
            key={i}
            className={`absolute pointer-events-none ${s.shape} ${s.anim}
              transition-opacity duration-700 ${isLoaded ? '' : 'opacity-0'}`}
            style={{
              ...s.style,
              background: s.gradient,
              opacity: isLoaded ? s.opacity : 0,
              animationDuration: s.dur,
              animationDelay:    s.delay,
              transitionDelay:   `${480 + i * 130}ms`,
            }}
          />
        ))}

        {/* ── BLOB 1: Main large purple/violet center blob ──────────────── */}
        <div
          className="absolute inset-[4%] rounded-full blur-3xl animate-pulse-gentle pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.82) 0%, rgba(168,85,247,0.65) 28%, rgba(192,132,252,0.38) 55%, rgba(233,213,255,0.12) 78%, transparent 100%)',
            animationDuration: '4s',
          }}
        />

        {/* ── BLOB 2: Inner bright core glow ────────────────────────────── */}
        <div
          className="absolute inset-[20%] rounded-full blur-2xl animate-pulse-gentle pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(192,80,255,0.65) 0%, rgba(168,85,247,0.45) 45%, transparent 100%)',
            animationDuration: '3s',
            animationDelay: '1s',
          }}
        />

        {/* ── BLOB 3: Left-side violet blob ─────────────────────────────── */}
        <div
          className="absolute rounded-full blur-3xl animate-float-slow pointer-events-none"
          style={{
            width: '52%', height: '52%',
            top: '22%', left: '0%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.42) 0%, rgba(109,40,217,0.22) 55%, transparent 100%)',
          }}
        />

        {/* ── BLOB 4: Right-side pink-violet blob ───────────────────────── */}
        <div
          className="absolute rounded-full blur-3xl animate-float-reverse pointer-events-none"
          style={{
            width: '50%', height: '50%',
            top: '24%', right: '0%',
            background: 'radial-gradient(circle, rgba(192,38,211,0.32) 0%, rgba(236,72,153,0.18) 58%, transparent 100%)',
          }}
        />

        {/* ── BLOB 5: Bottom soft lavender glow ─────────────────────────── */}
        <div
          className="absolute rounded-full blur-3xl animate-pulse-gentle pointer-events-none"
          style={{
            width: '60%', height: '45%',
            bottom: '4%', left: '20%',
            background: 'radial-gradient(circle, rgba(216,180,254,0.28) 0%, rgba(192,132,252,0.14) 60%, transparent 100%)',
            animationDuration: '5s',
            animationDelay: '0.5s',
          }}
        />

        {/* ── BLOB 6: Outer halo ring glow (rim lighting) ───────────────── */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, transparent 42%, rgba(167,139,250,0.18) 60%, rgba(216,180,254,0.12) 75%, transparent 100%)',
            filter: 'blur(8px)',
          }}
        />

        {/* ── Outermost soft shadow ring (blur, no hard line) ──────────── */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, transparent 47%, rgba(192,132,252,0.22) 49%, rgba(192,132,252,0.22) 51%, transparent 53%)',
            filter: 'blur(4px)',
          }}
        />

        {/* ── Inner orbit soft shadow ring ──────────────────────────────── */}
        <div
          className="absolute inset-[8%] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, transparent 47%, rgba(216,180,254,0.18) 49%, rgba(216,180,254,0.18) 51%, transparent 53%)',
            filter: 'blur(3px)',
          }}
        />

        {/* ── Photo ─────────────────────────────────────────────────────── */}
        <div
          className={`relative ${photoCls} shrink-0 z-10
            transform transition-all duration-700 ease-out
            ${isLoaded ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        >
          {/* Outer soft violet glow halo */}
          <div
            className="absolute -inset-5 rounded-full pointer-events-none animate-pulse-gentle"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.30) 55%, transparent 100%)',
              animationDuration: '3s',
            }}
          />

          {/* Thick white glowing ring */}
          <div
            className="absolute rounded-full"
            style={{
              inset: '-5px',
              background: 'white',
              boxShadow:
                '0 0 22px 5px rgba(167,139,250,0.55),' +
                '0 0 45px 10px rgba(139,92,246,0.28),' +
                'inset 0 0 12px rgba(139,92,246,0.12)',
            }}
          />
          {/* Thin gap between white ring and photo */}
          <div className="absolute -inset-px rounded-full bg-white dark:bg-slate-950" />

          {/* Photo */}
          <div className="relative w-full h-full rounded-full overflow-hidden z-10">
            <Image
              src="/images/profile.jpg"
              alt="Muhammad Salman Saleem"
              fill
              className="object-cover rounded-full"
              priority
              sizes="(max-width:768px) 218px, 290px"
            />
            {/* Subtle inner shadow overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ boxShadow: 'inset 0 0 32px rgba(139,92,246,0.28)' }}
            />
          </div>
        </div>

        {/* ── Badge icons (white circles on the orbit ring) ─────────────── */}
        {icons.map((Icon, i) => (
          <div
            key={i}
            className={`absolute z-20
              w-11 h-11 rounded-full flex items-center justify-center
              bg-white/95 dark:bg-slate-800/90 backdrop-blur-md
              border border-violet-100/60 dark:border-violet-700/40
              transform transition-all duration-500 ease-out cursor-pointer
              hover:scale-125 hover:-translate-y-1
              ${isLoaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{
              ...positions[i],
              transitionDelay: `${600 + i * 100}ms`,
              boxShadow: '0 4px 18px rgba(139,92,246,0.22), 0 1px 5px rgba(0,0,0,0.10)',
            }}
          >
            <Icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProfileImage;
