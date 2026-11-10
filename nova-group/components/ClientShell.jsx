'use client';

import { useState } from 'react';
import Header from './Header';
import MobileDrawer from './MobileDrawer';
import Footer from './Footer';
import ConsultationModal from './ConsultationModal';
import Toast from './Toast';

export default function ClientShell({ children }) {
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
    <>
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
        defaultService={modalService}
        onClose={handleCloseModal}
        onShowToast={handleShowToast}
      />

      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </>
  );
}
