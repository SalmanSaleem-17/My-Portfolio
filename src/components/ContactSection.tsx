'use client'

import { memo } from 'react';
import { Variants } from 'framer-motion';

// ── Sub-components ────────────────────────────────────────────────────────────
import ContactBackground    from '@/components/contact/ContactBackground';
import ContactHeader        from '@/components/contact/ContactHeader';
import ContactMethodsPanel  from '@/components/contact/ContactMethodsPanel';
import ContactSidebar       from '@/components/contact/ContactSidebar';

// ─────────────────────────────────────────────────────────────────────────────

interface ContactSectionProps {
  containerVariants?: Variants;
  itemVariants?:      Variants;
}

export default memo(function ContactSection({}: ContactSectionProps) {
  return (
    <div className="relative py-8">
      {/* ── Ambient blobs ── */}
      <ContactBackground />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <ContactHeader />

        {/* ── Main grid: 2/3 contact cards + 1/3 sidebar ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <ContactMethodsPanel />
          </div>
          <div className="order-1 lg:order-2">
            <ContactSidebar />
          </div>
        </div>
      </div>
    </div>
  );
});