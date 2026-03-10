'use client';

import { useState } from 'react';
import ScrollWrapper from './components/ScrollWrapper';
import MetadataHeader from './components/MetadataHeader';
import HalftoneCanvas from './components/HalftoneCanvas';
import IndexNav from './components/IndexNav';
import ContentPanel from './components/ContentPanel';
import ActionPanel from './components/ActionPanel';
import MarqueeFooter from './components/MarqueeFooter';
import type { SectionId } from './components/IndexNav';

export default function Page() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  const handleSelect = (id: SectionId) => {
    setActiveSection((prev) => (prev === id ? null : id));
  };

  return (
    <ScrollWrapper>
      <div className="page-wrapper">
        <MetadataHeader />
        <HalftoneCanvas />
        <section className="content-grid">
          <IndexNav active={activeSection} onSelect={handleSelect} />
          <ContentPanel activeSection={activeSection} />
          <ActionPanel />
        </section>
      </div>
      <MarqueeFooter />
    </ScrollWrapper>
  );
}
