'use client';

import { useState, useEffect } from 'react';
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
    if (newPassword !== confirmPassword) {
      setToastType('error');
      setToastMsg('New passwords do not match');
      return;
    }

    setChangingPassword(true);

    try {
      await apiRequest('/admin/auth/change-password', {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      setToastType('success');
      setToastMsg('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
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
          Configure company contact information and update administrator credentials
        </p>
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
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">New Password *</label>
              <input
                type="password"
                className="form-input"
                required
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password *</label>
              <input
                type="password"
                className="form-input"
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }} disabled={changingPassword}>
              {changingPassword ? 'Updating...' : 'Update Admin Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
