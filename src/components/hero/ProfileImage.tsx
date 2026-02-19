'use client'

import React from 'react';
import Image from 'next/image';
import { FLOATING_ICONS } from './types';

interface ProfileImageProps {
  isLoaded: boolean;
  isMobile?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ isLoaded, isMobile = false }) => {
  const imgSize = isMobile ? 'w-48 h-48' : 'w-64 h-64 xl:w-80 xl:h-80';
  const icons   = isMobile ? FLOATING_ICONS.slice(0, 4) : FLOATING_ICONS;

  // Icon positions — tighter on mobile so they stay within viewport
  const mobileIconPositions = [
    { left: '4%',  top:    '18%' },
    { right: '4%', top:    '18%' },
    { left: '4%',  bottom: '18%' },
    { right: '4%', bottom: '18%' },
  ];

  const desktopIconPositions = [
    { left: '-5%',  top:    '15%' },
    { right: '-5%', top:    '15%' },
    { left: '-5%',  bottom: '15%' },
    { right: '-5%', bottom: '15%' },
    { left: '50%',  top:    '-5%',    transform: 'translateX(-50%)' },
    { left: '50%',  bottom: '-5%',    transform: 'translateX(-50%)' },
  ];

  const positions = isMobile ? mobileIconPositions : desktopIconPositions;

  // Geometric shapes — scaled down on mobile but present on both
  const geoMobile = 'opacity-25';
  const geoDeskop = 'opacity-20';

  return (
    <div className="relative">
      <div
        className={`relative transform transition-all duration-600 ease-out
          ${isLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >

        {/* ── Decorative rings ───────────────────────────────────────────── */}
        <div className="absolute -inset-16 rounded-full bg-gradient-to-br from-purple-300 via-pink-300 to-violet-300 opacity-15 animate-spin-slow" />
        <div className="absolute -inset-12 rounded-full bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-20 animate-spin-reverse" />
        <div className="absolute -inset-8  rounded-full bg-gradient-to-bl from-violet-300 via-purple-300 to-indigo-300 opacity-25 animate-float-slow" />
        <div className="absolute -inset-6  rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 opacity-30 blur-md animate-pulse-gentle" />

        {/* ── Geometric accents — ALL screen sizes ──────────────────────── */}

        {/* Top-right diamond */}
        <div
          className={`absolute bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg animate-float rotate-45
            ${isMobile ? `-top-5 -right-5 w-9 h-9 ${geoMobile}` : `-top-8 -right-8 w-16 h-16 ${geoDeskop}`}`}
        />

        {/* Bottom-left circle */}
        <div
          className={`absolute bg-gradient-to-tr from-blue-400 to-violet-500 rounded-full animate-float-reverse
            ${isMobile ? `-bottom-5 -left-5 w-7 h-7 ${geoMobile}` : `-bottom-8 -left-8 w-12 h-12 ${geoDeskop}`}`}
        />

        {/* Mid-left dot */}
        <div
          className={`absolute bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse-slow
            ${isMobile ? `top-1/2 -left-7 w-5 h-5 opacity-30` : `top-1/2 -left-12 w-8 h-8 opacity-30`}`}
        />

        {/* Top-right small square */}
        <div
          className={`absolute bg-gradient-to-l from-violet-400 to-blue-500 rounded-lg animate-float rotate-12
            ${isMobile ? `top-1/4 -right-7 w-6 h-6 opacity-30` : `top-1/4 -right-12 w-10 h-10 ${geoDeskop}`}`}
        />

        {/* Extra: bottom-right triangle-ish (desktop + mobile smaller) */}
        <div
          className={`absolute bg-gradient-to-tl from-emerald-400 to-cyan-400 rounded-lg animate-float-slow rotate-[30deg]
            ${isMobile ? `-bottom-4 -right-6 w-5 h-5 opacity-20` : `-bottom-6 -right-10 w-9 h-9 opacity-15`}`}
        />

        {/* Extra: top-left small orb */}
        <div
          className={`absolute bg-gradient-to-br from-rose-400 to-pink-500 rounded-full animate-pulse-gentle
            ${isMobile ? `-top-4 -left-5 w-5 h-5 opacity-25` : `-top-6 -left-10 w-8 h-8 opacity-20`}`}
        />

        {/* Orbiting ring glow — desktop only (too large for mobile) */}
        {!isMobile && (
          <div className="absolute -inset-20 rounded-full border border-purple-300/30 animate-spin-slow" />
        )}

        {/* ── Glowing halo behind photo ──────────────────────────────────── */}
        <div
          className={`absolute inset-0 rounded-full
            bg-gradient-to-br from-violet-400/40 via-purple-400/30 to-pink-400/40
            blur-xl animate-pulse-gentle
            ${isMobile ? 'scale-110' : 'scale-125'}`}
        />

        {/* ── Photo ─────────────────────────────────────────────────────── */}
        <div className={`relative ${imgSize} mx-auto`}>
          {/* Multi-layer ring border around photo */}
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-violet-500 opacity-60 blur-[2px]" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-violet-500 via-purple-400 to-pink-500 opacity-40" />
          <Image
            src="/images/profile.jpg"
            alt="Muhammad Salman Saleem"
            fill
            className="rounded-full border-4 border-white shadow-2xl object-cover relative z-10"
            priority
            sizes="(max-width:768px) 192px, (max-width:1280px) 256px, 320px"
          />
        </div>

        {/* ── Floating skill icon buttons ───────────────────────────────── */}
        {icons.map((Icon, i) => (
          <div
            key={i}
            className={`absolute bg-white rounded-full shadow-xl flex items-center justify-center
              border-2 border-purple-100
              transform transition-all duration-500 ease-out
              hover:scale-125 hover:rotate-12 hover:shadow-purple-200/60 cursor-pointer
              ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}
              ${isLoaded ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
            style={{
              ...positions[i],
              transitionDelay:  `${(isMobile ? 500 : 800) + i * 100}ms`,
              boxShadow: '0 4px 16px rgba(124,58,237,0.18)',
            }}
          >
            {/* Inner glow ring on icon buttons */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100 to-violet-100 opacity-60" />
            <Icon className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-purple-600 relative z-10`} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProfileImage;