// API Configuration
const API_BASE = (import.meta.env.VITE_API_URL || 'https://upwork-testing-backend.vercel.app').replace(/\/+$/, '');

console.log('API Configuration:', {
  env: import.meta.env.MODE,
  apiBase: API_BASE,
  nodeEnv: import.meta.env.NODE_ENV
});

// Build URL without double slashes
const withBase = (path: string): string => {
  // Remove leading slashes from path
  const cleanPath = String(path).replace(/^\/+/, '');
  // Combine: base (no trailing slash) + single slash + path (no leading slash)
  return `${API_BASE}/${cleanPath}`;
};

const TOKEN_KEY = 'mh_admin_token';

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = withBase(path);
  
  // Ensure headers exist
  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  
  // Add auth token if available
  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && !headers.has('Authorization')) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }
  
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include' as const,
    mode: 'cors',
  };

  console.log('API Request:', {
    url,
    method: options.method || 'GET',
    headers: Object.fromEntries(headers.entries()),
    credentials: fetchOptions.credentials,
    mode: fetchOptions.mode
  });

  try {
    const response = await fetch(url, fetchOptions);
    
    // Handle non-2xx responses
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json().catch(() => ({}));
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        const text = await response.text();
        if (text) {
          errorMessage = text;
        }
      }
      throw new Error(errorMessage);
    }
    
    // For 204 No Content responses, return null
    if (response.status === 204) {
      return null as unknown as T;
    }
    
    // Parse and return JSON response
    return await response.json() as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Helper function to get the URL without making a request
export function getApiUrl(path: string): string {
  return withBase(path);
}

export const Api = {
  health: () => apiFetch<{ status: string }>('/'),
};
