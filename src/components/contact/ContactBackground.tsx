'use client'

import { memo } from 'react';

const ContactBackground = memo(() => (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute top-0 left-0 w-80 h-80
        bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-slow"
      style={{ transform: 'translate(-30%, -30%)' }}
    />
    <div
      className="absolute bottom-0 right-0 w-80 h-80
        bg-gradient-to-tl from-purple-300 via-pink-200 to-rose-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-reverse"
      style={{ transform: 'translate(30%, 30%)' }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-96 h-96 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200
        rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse-slow"
    />
  </div>
));

ContactBackground.displayName = 'ContactBackground';
export default ContactBackground;