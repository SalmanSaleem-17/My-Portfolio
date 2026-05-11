'use client'

import { memo } from 'react';

const SkillsBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none dark:hidden">
    {/* Top-left purple — matches hero/about palette */}
    <div
      className="absolute top-0 left-0 w-80 h-80
        bg-linear-to-br from-purple-200 via-violet-200 to-indigo-200
        rounded-full mix-blend-multiply filter blur-2xl opacity-40"
      style={{ transform: 'translate(-30%, -30%)' }}
    />
    {/* Bottom-right pink */}
    <div
      className="absolute bottom-0 right-0 w-80 h-80
        bg-linear-to-tl from-purple-300 via-pink-200 to-rose-200
        rounded-full mix-blend-multiply filter blur-2xl opacity-40"
      style={{ transform: 'translate(30%, 30%)' }}
    />
  </div>
));

SkillsBackground.displayName = 'SkillsBackground';
export default SkillsBackground;