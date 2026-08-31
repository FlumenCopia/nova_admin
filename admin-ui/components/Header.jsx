'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../lib/api';
import Modal from './Modal';

export default function Header({ user, onToggleSidebar }) {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const confirmLogout = async () => {
    try {
      setLoggingOut(true);
      await apiRequest('/admin/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error(err);
    } finally {
      setShowLogoutModal(false);
      router.push('/login?logout=success');
    }
  };

  return (
    <>
      <header className="admin-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onToggleSidebar}
            className="mobile-menu-btn"
            aria-label="Toggle navigation menu"
            title="Toggle Navigation Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="user-info-wrap">
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{user?.name || 'Administrator'}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{user?.email || 'admin@novainnovations.in'}</div>
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            className="btn-secondary logout-btn"
            title="Sign out of Admin Panel"
          >
            Logout
          </button>
        </div>
      </header>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)} title="Confirm Logout">
        <div style={{ padding: '8px 0' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Are you sure you want to end your administrative session and log out?
          </p>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="btn-danger"
              disabled={loggingOut}
            >
              {loggingOut ? 'Logging out...' : 'Confirm Logout'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
