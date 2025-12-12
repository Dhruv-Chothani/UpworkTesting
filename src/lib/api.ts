// Default to backend on 5000; can be overridden via VITE_API_URL
let API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Normalize API_BASE: remove ALL trailing slashes and whitespace
API_BASE = String(API_BASE).trim().replace(/\/+$/, '');

// Build URL without double slashes
const withBase = (path: string) => {
  // Remove leading slashes from path
  const cleanPath = String(path).replace(/^\/+/, '');
  // Combine: base (no trailing slash) + single slash + path (no leading slash)
  const url = `${API_BASE}/${cleanPath}`;
  
  // Debug in development
  if (import.meta.env.DEV) {
    console.log(`[API] ${path} → ${url}`);
  }
  
  return url;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = withBase(path);
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || res.statusText);
  }
  return res.json();
}

export const Api = {
  health: () => apiFetch('/api/health'),
};

