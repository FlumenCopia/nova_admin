const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function getMediaUrl(url, fallback = '/mainhero1.png') {
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // If it's a local public asset in the Next.js frontend (e.g. /mainhero1.png, /logo.png, etc)
  if (!url.startsWith('/uploads/') && !url.startsWith('uploads/')) {
    return url.startsWith('/') ? url : `/${url}`;
  }
  const apiServer = API_BASE.replace(/\/api\/?$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${apiServer}${cleanPath}`;
}

export async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, options);
    if (!res.ok) return { success: false, data: null };
    return await res.json();
  } catch (error) {
    console.error(`Fetch API error [${endpoint}]:`, error);
    return { success: false, data: null };
  }
}
