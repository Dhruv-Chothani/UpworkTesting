// Default to backend on 5000; can be overridden via VITE_API_URL
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Remove trailing slash from API_BASE and ensure path starts with /
const withBase = (path: string) => {
  const base = API_BASE.replace(/\/+$/, ''); // Remove trailing slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(withBase(path), {
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

