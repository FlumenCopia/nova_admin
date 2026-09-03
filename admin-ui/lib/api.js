const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const headers = { ...options.headers };
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
  const apiServer = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');
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
