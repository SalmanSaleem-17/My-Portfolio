'use client'

import { memo } from 'react';
import { Send } from 'lucide-react';
import { CONTACT_METHODS } from './types';
import ContactCard from './ContactCard';

const ContactMethodsPanel = memo(() => (
  <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-8 rounded-xl sm:rounded-2xl
    shadow-lg border border-white/40">

    {/* Panel heading */}
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl shadow-lg">
        <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
        Choose Your Preferred Way
      </h3>
    </div>

    {/* 2-column grid of contact cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {CONTACT_METHODS.map((method, index) => (
        <ContactCard key={method.label} method={method} index={index} />
      ))}
    </div>
  </div>
));

ContactMethodsPanel.displayName = 'ContactMethodsPanel';
export default ContactMethodsPanel;