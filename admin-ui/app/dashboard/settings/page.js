'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Toast from '../../../components/Toast';
import { apiRequest } from '../../../lib/api';

export default function SettingsAdminPage() {
  const [primaryPhone, setPrimaryPhone] = useState('+91 95390 00640');
  const [altPhone, setAltPhone] = useState('+91 95263 64446');
  const [contactEmail, setContactEmail] = useState('novainnovations2020@gmail.com');
  const [hqAddress, setHqAddress] = useState('T.C 26/929(2), C.K. Tower, Panavila Jn., Thiruvananthapuram - 695001');
  const [cityOfficeAddress, setCityOfficeAddress] = useState('T.C. 29/314, S J Tower, MP Appan Road, Vazhuthacaud, Trivandrum - 695014');
  const [savingSettings, setSavingSettings] = useState(false);

  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success');

  const fetchSettings = async () => {
    try {
      const res = await apiRequest('/admin/settings');
      if (res.success && res.data) {
        setPrimaryPhone(res.data.primaryPhone || '');
        setAltPhone(res.data.altPhone || '');
        setContactEmail(res.data.contactEmail || '');
        setHqAddress(res.data.hqAddress || '');
        setCityOfficeAddress(res.data.cityOfficeAddress || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);

    try {
      await apiRequest('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify({
          primaryPhone,
          altPhone,
          contactEmail,
          hqAddress,
          cityOfficeAddress,
        }),
      });
      setToastType('success');
      setToastMsg('Site contact details updated successfully!');
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to update settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setToastType('error');
      setToastMsg('All password fields are required');
      return;
    }

    if (newPassword.length < 6) {
      setToastType('error');
      setToastMsg('New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setToastType('error');
      setToastMsg('New passwords do not match');
      return;
    }

    if (changingPassword) return;
    setChangingPassword(true);

    try {
      const res = await apiRequest('/admin/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      if (res && res.success) {
        setToastType('success');
        setToastMsg(res.message || 'Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setToastType('error');
        setToastMsg(res?.message || 'Current password is incorrect.');
      }
    } catch (err) {
      setToastType('error');
      setToastMsg(err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <>
      <Toast message={toastMsg} type={toastType} onClose={() => setToastMsg('')} />

      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Settings & Security</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Manage company contact information and administrator credentials
        </p>
      </div>

      {/* DEDICATED HERO BANNER NAVIGATION CARD */}
      <div
        className="card"
        style={{
          marginBottom: '28px',
          border: '1px solid #e2e8f0',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '20px 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(225, 29, 72, 0.08)',
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="12" rx="2"></rect>
              <path d="M12 16v5"></path>
              <path d="M8 21h8"></path>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--color-text-primary)' }}>
              Website Hero Section & Background Banner
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginTop: '4px', margin: 0 }}>
              Update billboard image, headline, and tagline on the new dedicated Hero Banner page
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/banner"
          className="btn-primary"
          style={{ padding: '10px 18px', fontSize: '0.88rem', textDecoration: 'none' }}
        >
          Manage Hero Banner →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {/* SITE CONTACT SETTINGS */}
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Website Contact Details</h2>

          <form onSubmit={handleSaveSettings}>
            <div className="form-group">
              <label className="form-label">Director Contact (Primary Phone) *</label>
              <input
                type="text"
                className="form-input"
                required
                value={primaryPhone}
                onChange={(e) => setPrimaryPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Office Desk Phone</label>
              <input
                type="text"
                className="form-input"
                value={altPhone}
                onChange={(e) => setAltPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Contact Email *</label>
              <input
                type="email"
                className="form-input"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Registered HQ Address</label>
              <textarea
                className="form-textarea"
                rows="2"
                value={hqAddress}
                onChange={(e) => setHqAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">City Office Address</label>
              <textarea
                className="form-textarea"
                rows="2"
                value={cityOfficeAddress}
                onChange={(e) => setCityOfficeAddress(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={savingSettings}>
              {savingSettings ? 'Saving...' : 'Save Contact Settings'}
            </button>
          </form>
        </div>

        {/* SECURITY & CHANGE PASSWORD */}
        <div className="card">
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Change Admin Password</h2>

          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label className="form-label">Current Password *</label>
              <input
                type="password"
                className="form-input"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password *</label>
              <input
                type="password"
                className="form-input"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input
                type="password"
                className="form-input"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              disabled={changingPassword}
            >
              {changingPassword ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
