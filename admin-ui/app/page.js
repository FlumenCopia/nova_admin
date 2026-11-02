'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../lib/api';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await apiRequest('/admin/auth/me');
        if (res && res.success) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
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
