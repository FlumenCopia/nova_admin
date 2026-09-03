'use client';

import { useState } from 'react';
import './globals.css';
import Header from '../components/Header';
import MobileDrawer from '../components/MobileDrawer';
import Footer from '../components/Footer';
import ConsultationModal from '../components/ConsultationModal';
import Toast from '../components/Toast';

export default function RootLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState('Outdoor Hoardings');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleOpenModal = (serviceType = 'Outdoor Hoardings') => {
    setModalService(serviceType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleToggleMobile = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
    setIsToastVisible(true);
    setTimeout(() => {
      setIsToastVisible(false);
    }, 4000);
  };

  return (
    <html lang="en">
      <head>
        <title>INNOVATIONS | Outdoors • Design Studio • Events | Kerala</title>
        <meta
          name="description"
          content="NOVA Innovations - Best Innovative & Creative Advertising Agency in Kerala. Outdoor Hoardings, Vehicle Branding, Shop Branding, Design Studio, and Events. 27+ Years of Excellence."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <Header
          onOpenModal={handleOpenModal}
          onToggleMobile={handleToggleMobile}
          isMobileOpen={isMobileOpen}
        />

        <MobileDrawer
          isOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
          onOpenModal={handleOpenModal}
        />

        <main>{children}</main>

        <Footer onShowToast={handleShowToast} />

        <ConsultationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          initialService={modalService}
          onShowToast={handleShowToast}
        />

        <Toast message={toastMessage} isVisible={isToastVisible} />
      </body>
    </html>
  );
}
