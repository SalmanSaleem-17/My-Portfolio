'use client'

import React from 'react';
import { MapPin, Phone } from 'lucide-react';

interface ContactInfoProps {
  isMobile?: boolean;
}

const CONTACTS = [
  {
    icon: MapPin,
    value:       'Lahore, Punjab, Pakistan',
    description: 'Find me on the map',
    href:        'https://maps.app.goo.gl/7MJA2pzditj94aek6',
    mobileValue: 'Lahore, Pakistan',
  },
  {
    icon: Phone,
    value:       '0345-6501771',
    description: 'Call me directly',
    href:        'tel:+923456501771',
    mobileValue: '0345-6501771',
  },
];

const ContactInfo: React.FC<ContactInfoProps> = ({ isMobile = false }) => {
  return (
    <div className={`flex flex-wrap gap-4 mb-8 ${isMobile ? 'justify-center' : ''}`}>
      {CONTACTS.map((c, i) => (
        <a
          key={i}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 text-gray-700
            bg-gradient-to-br from-purple-50/80 to-violet-50/80
            rounded-full shadow-md backdrop-blur-sm
            transform transition-all duration-300 ease-out
            hover:scale-105 hover:-translate-y-1
            ${isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-2'}`}
        >
          <c.icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
          {isMobile ? (
            <span className="font-medium">{c.mobileValue}</span>
          ) : (
            <div className="flex flex-col">
              <span className="font-medium">{c.value}</span>
              <span className="text-xs text-gray-500">{c.description}</span>
            </div>
          )}
        </a>
      ))}
    </div>
  );
};

export default ContactInfo;