'use client'

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

interface ProfileImageProps {
  isLoaded: boolean;
  isMobile?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ isLoaded, isMobile = false }) => {
  const wrapCls = isMobile
    ? 'w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]'
    : 'w-[320px] h-[320px] xl:w-[380px] xl:h-[380px]';

  return (
    <div className={`relative mx-auto ${wrapCls}`}>

      {/* ── Blurred glow halo ──────────────────────────────────────────── */}
      <div className="absolute inset-0 pf-glow opacity-60 pointer-events-none" />

      {/* ── Organic blob frame ─────────────────────────────────────────── */}
      <div
        className={`relative w-full h-full overflow-hidden pf-frame border border-purple-400/60
          transition-all duration-700 ease-out
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <Image
          src="/images/profile.jpg"
          alt="Muhammad Salman Saleem"
          fill
          priority
          sizes={isMobile ? '(max-width:640px) 240px, 280px' : '(max-width:1280px) 320px, 380px'}
          className="object-cover object-top"
        />
        <div className="absolute inset-0 pf-vignette pointer-events-none" />
      </div>

      {/* ── Orbit ring ─────────────────────────────────────────────────── */}
      {!isMobile && (
        <div className="absolute pf-orbit border border-purple-400/35 pointer-events-none" />
      )}

      {/* ── Experience badge ───────────────────────────────────────────── */}
      <div className={`absolute z-20 pf-badge flex flex-col items-center justify-center rounded-full border border-purple-400/50 backdrop-blur-xl
        ${isMobile ? 'pf-badge-mobile' : ''}`}>
        <span className={`font-bold text-purple-400 leading-none ${isMobile ? 'text-[22px]' : 'text-[28px]'}`}>2+</span>
        <span className="text-center text-[9px] text-white/75 leading-tight mt-0.5">
          Years of<br />Experience
        </span>
      </div>

      {/* ── Contact info card ──────────────────────────────────────────── */}
      {!isMobile && (
        <div className="absolute z-20 pf-card rounded-2xl border border-slate-700/60 backdrop-blur-md py-3 px-4 shadow-2xl">
          <a
            href="https://maps.app.goo.gl/7MJA2pzditj94aek6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 mb-2.5 hover:opacity-75 transition-opacity"
          >
            <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-xs text-white/90">Lahore, Punjab, Pakistan</span>
          </a>
          <a
            href="tel:+923456501771"
            className="flex items-center gap-2.5 mb-2.5 hover:opacity-75 transition-opacity"
          >
            <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-xs text-white/90">0345-6501771</span>
          </a>
          <a
            href="mailto:contact@salmansaleem.dev"
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity"
          >
            <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="text-xs text-white/90">contact@salmansaleem.dev</span>
          </a>
        </div>
      )}

    </div>
  );
};

export default ProfileImage;
