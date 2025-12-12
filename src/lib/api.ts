// Production backend URL
const PROD_API_BASE = 'https://upwork-testing-backend.vercel.app';

// Get API base URL from environment or use production
let API_BASE = import.meta.env.VITE_API_URL || PROD_API_BASE;

// Normalize API_BASE
API_BASE = String(API_BASE).trim().replace(/\/+$/, '');

// Build URL without double slashes
const withBase = (path: string) => {
  // Remove leading slashes from path
  const cleanPath = String(path).replace(/^\/+/, '');
  // Combine: base (no trailing slash) + single slash + path (no leading slash)
  return `${API_BASE}/${cleanPath}`;
};

const TOKEN_KEY = 'mh_admin_token';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = withBase(path);
  const token = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;

  const headers = new Headers({
    'Content-Type': 'application/json',
    ...(options.headers || {})
  });

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
    mode: 'cors',
  };

  try {
    const res = await fetch(url, fetchOptions);

    // Handle empty responses (like 204 No Content)
    if (res.status === 204) {
      return null as unknown as T;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const error = new Error(data.message || 'Request failed');
      Object.assign(error, { status: res.status, data });
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`API Error [${options.method || 'GET'} ${path}]:`, error);
    throw error;
  }
}

export const Api = {
  health: () => apiFetch('/api/health'),
};

