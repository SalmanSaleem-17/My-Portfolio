import { Mail, Phone, Clock, MapPin, Heart, Sparkles } from 'lucide-react';
import { FaWhatsapp, FaGithub, FaDiscord, FaTelegram, FaLinkedin } from 'react-icons/fa6';

export interface ContactMethod {
  icon:        any;
  label:       string;
  value:       string;
  href:        string;
  color:       string;
  bgColor:     string;
  description: string;
  external?:   boolean;
}

export interface QuickStat {
  label: string;
  value: string;
  icon:  any;
}

export interface SocialLink {
  icon:  any;
  href:  string;
  color: string;
}

export const CONTACT_METHODS: ContactMethod[] = [
  {
    icon:        Mail,
    label:       'Email',
    value:       'shanisaleem17@gmail.com',
    href:        'mailto:shanisaleem17@gmail.com',
    color:       'bg-gradient-to-br from-red-500 to-pink-500',
    bgColor:     'bg-gradient-to-br from-red-50/80 to-pink-50/80',
    description: 'Drop me a line anytime',
  },
  {
    icon:        FaLinkedin,
    label:       'LinkedIn',
    value:       'muhammad-salman-saleem',
    href:        'https://www.linkedin.com/in/muhammad-salman-saleem-8a9a96266',
    color:       'bg-gradient-to-br from-blue-600 to-blue-700',
    bgColor:     'bg-gradient-to-br from-blue-50/80 to-indigo-50/80',
    description: 'Let\'s connect professionally',
    external:    true,
  },
  {
    icon:        FaWhatsapp,
    label:       'WhatsApp',
    value:       '+92 345-6501771',
    href:        'https://wa.me/923456501771',
    color:       'bg-gradient-to-br from-green-500 to-emerald-500',
    bgColor:     'bg-gradient-to-br from-green-50/80 to-emerald-50/80',
    description: 'Quick chat or call',
    external:    true,
  },
  {
    icon:        Phone,
    label:       'Phone',
    value:       '0345-6501771',
    href:        'tel:+923456501771',
    color:       'bg-gradient-to-br from-purple-500 to-violet-500',
    bgColor:     'bg-gradient-to-br from-purple-50/80 to-violet-50/80',
    description: 'Call me directly',
  },
];

export const QUICK_STATS: QuickStat[] = [
  { label: 'Response Time', value: '< 24hrs',        icon: Clock    },
  { label: 'Location',      value: 'Lahore, PK',     icon: MapPin   },
  { label: 'Projects Done', value: '5+ Projects',    icon: Heart    },
  { label: 'Always Up For', value: 'Good Coffee ☕', icon: Sparkles },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { icon: FaGithub,   href: 'https://github.com/salmansaleem-17',                              color: 'hover:bg-slate-200'  },
  { icon: FaDiscord,  href: '#',                                                                color: 'hover:bg-indigo-100' },
  { icon: FaTelegram, href: '#',                                                                color: 'hover:bg-blue-100'   },
];