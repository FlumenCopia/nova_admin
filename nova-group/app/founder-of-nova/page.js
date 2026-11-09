'use client';

import { useState } from 'react';

import {
  FounderHero,
  FounderServices,
  FounderAboutMosaic,
  FounderLeadershipSpotlight,
  FounderPartnersMarquee,
  FounderSwipeGallery,
  FounderCtaBanner,
  FounderContactSection,
  FounderContactModal,
} from '../../components/founder';

export default function FounderOfNovaPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Outdoor Hoardings');

  const handleOpenModal = (serviceName = 'Outdoor Hoardings') => {
    setModalService(serviceName);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="founder-page-wrapper">
      {/* 1. Hero & Founder Profile */}
      <FounderHero onOpenModal={handleOpenModal} />

      {/* 2. Comprehensive Advertising Services (6 Core Offerings) */}
      <FounderServices onOpenModal={handleOpenModal} />

      {/* 3. About & 27+ Years Heritage Mosaic */}
      <FounderAboutMosaic onOpenModal={handleOpenModal} />

      {/* 4. Leadership Spotlight (Gireesh Kumar S) */}
      <div className="container" style={{ margin: '0 auto', maxWidth: '1280px', padding: '0 24px' }}>
        <FounderLeadershipSpotlight onOpenModal={handleOpenModal} />
      </div>

      {/* 5. Client & Partner Logos Infinite Marquee */}
      <FounderPartnersMarquee />

      {/* 6. High-Impact Campaign Swipe Gallery */}
      <FounderSwipeGallery onOpenModal={handleOpenModal} />

      {/* 7. Action CTA Banner */}
      <FounderCtaBanner onOpenModal={handleOpenModal} />

      {/* 8. Direct Media Inquiries & Booking Form */}
      <div className="container" style={{ margin: '0 auto', maxWidth: '1280px', padding: '0 24px' }}>
        <FounderContactSection />
      </div>

      {/* Quick Booking Contact Modal */}
      <FounderContactModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultService={modalService}
      />
    </main>
  );
}
