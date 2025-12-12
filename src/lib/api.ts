// Default to backend URL; can be overridden via VITE_API_URL
let API_BASE = import.meta.env.VITE_API_URL || 'https://upwork-testing-backend.vercel.app';

// Normalize API_BASE: remove ALL trailing slashes and whitespace
API_BASE = String(API_BASE).trim().replace(/\/+$/, '');

// Log the API base URL in development
if (import.meta.env.DEV) {
  console.log('API Base URL:', API_BASE);
}

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

const TOKEN_KEY = 'mh_admin_token';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = withBase(path);

  // Attach JWT if present (for protected routes)
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
      ...authHeader,
    },
    credentials: 'include',
    mode: 'cors',
  };

  if (import.meta.env.DEV) {
    console.log(`[API] ${options.method || 'GET'} ${path} → ${url}`, { options: fetchOptions });
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || res.statusText);
  }
  return res.json();
}

export const Api = {
  health: () => apiFetch('/api/health'),
};

