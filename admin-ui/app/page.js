'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../lib/api';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        await apiRequest('/admin/auth/me');
        router.push('/dashboard');
      } catch (err) {
        router.push('/login');
      }
    }
    checkAuth();
  }, [router]);

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
      Loading Nova Admin Desk...
    </div>
  );
}
