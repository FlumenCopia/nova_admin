export function getApiBase() {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (!isLocal) {
      if (host.includes('novainnovations.in')) {
        return 'https://novainnovations.in/api';
      }
      return `${window.location.origin}/api`;
    }
  }
  return 'http://localhost:5000/api';
}

export function getPublicSiteUrl() {
  if (process.env.NEXT_PUBLIC_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_PUBLIC_SITE_URL.replace(/\/+$/, '');
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (!isLocal) {
      if (host.includes('novainnovations.in')) {
        return 'https://novainnovations.in';
      }
      return window.location.origin;
    }
  }
  return 'http://localhost:3000';
}

export const API_BASE = getApiBase();
export const PUBLIC_SITE_URL = getPublicSiteUrl();

export async function apiRequest(endpoint, options = {}) {
  const base = getApiBase();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${base}${cleanEndpoint}`;

  const headers = { ...options.headers };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token');
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Ensures HttpOnly auth cookie is sent
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      return { success: false, message: data.message || 'API request failed' };
    }
    return data;
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    return { success: false, message: error.message || 'Network error' };
  }
}

export const apiFetch = apiRequest;

export function getMediaUrl(url, fallback = '/logo.png') {
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/client-logos/') || url.startsWith('/logo.png') || url.startsWith('/image/')) return url;
  const apiServer = getApiBase().replace(/\/api\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${apiServer}${cleanPath}`;
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return apiRequest('/admin/portfolio/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadMultipleImages(files) {
  const formData = new FormData();
  Array.from(files).forEach((file) => {
    formData.append('images', file);
  });

  return apiRequest('/admin/portfolio/upload-multiple', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadBanner(file) {
  const formData = new FormData();
  formData.append('image', file);

  return apiRequest('/admin/settings/banner', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadLeaderImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return apiRequest('/admin/settings/leader-image', {
    method: 'POST',
    body: formData,
  });
}

export async function uploadFounderImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  return apiRequest('/admin/settings/founder-image', {
    method: 'POST',
    body: formData,
  });
}
