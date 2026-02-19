'use client'

import { memo } from 'react';

const AboutBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none">

    {/* Top-left purple blob — matches hero top-right blob color, no overflow */}
    <div
      className="absolute top-0 left-0 w-80 h-80
        bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-slow"
      style={{ transform: 'translate(-30%, -30%)' }}
    />

    {/* Bottom-right pink blob — matches hero bottom-left blob */}
    <div
      className="absolute bottom-0 right-0 w-80 h-80
        bg-gradient-to-tl from-purple-300 via-pink-200 to-rose-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-reverse"
      style={{ transform: 'translate(30%, 30%)' }}
    />

    {/* Centre soft pulse — same as hero */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-96 h-96 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow"
    />

  </div>
));

AboutBackground.displayName = 'AboutBackground';
export default AboutBackground;