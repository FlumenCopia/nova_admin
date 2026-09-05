'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiRequest } from '../../lib/api';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoggedOut = searchParams.get('logout') === 'success';

  useEffect(() => {
    async function checkExistingAuth() {
      try {
        const res = await apiRequest('/admin/auth/me');
        if (res && res.success) {
          router.push('/dashboard');
        }
      } catch (err) {
        // Not authenticated, stay on login page
      }
    }
    checkExistingAuth();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await apiRequest('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (res && res.success) {
        router.push('/dashboard');
      } else {
        setError(res?.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <img
          src="/logo.png"
          alt="Nova Innovations"
          style={{ height: '48px', width: 'auto', objectFit: 'contain', marginBottom: '12px' }}
        />
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>Admin Desk Portal</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.88rem', marginTop: '4px' }}>
          Sign in to manage hoardings, leads & client logos
        </p>
      </div>

      {isLoggedOut && !error && (
        <div
          style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.25)',
            color: '#15803d',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '0.88rem',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          ✓ You have been logged out successfully.
        </div>
      )}

      {error && (
        <div
          style={{
            background: 'rgba(217, 45, 32, 0.1)',
            border: '1px solid rgba(217, 45, 32, 0.25)',
            color: 'var(--color-danger)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
            fontSize: '0.88rem',
            fontWeight: 600,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Admin Email
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '8px' }}
          disabled={loading}
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-page-wrap">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
