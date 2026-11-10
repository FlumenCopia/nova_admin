
export function getApiBase() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocal ? 'http://localhost:5000/api' : `${window.location.origin}/api`;
  }
  return 'http://127.0.0.1:5000/api';
}

export const API_BASE = getApiBase();

export function getMediaUrl(url, fallback = '/mainhero1.png') {
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // If it's a local public asset in the Next.js frontend (e.g. /mainhero1.png, /logo.png, etc)
  if (!url.startsWith('/uploads/') && !url.startsWith('uploads/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }
  const apiServer = getApiBase().replace(/\/api\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${apiServer}${cleanPath}`;
}

export async function fetchApi(endpoint, options = {}) {
  const base = getApiBase();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${base}${cleanEndpoint}`;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      ...options,
    });
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch (error) {
    console.error(`Fetch API error [${endpoint}]:`, error);
    return { success: false, data: null };
  }
}
