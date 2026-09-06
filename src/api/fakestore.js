import localProducts from '../data/products.json';

const BASE_URL = 'https://fakestoreapi.com';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  // Cloudflare challenge pages can return HTML with a 200-ish path; guard JSON parse.
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('Unexpected non-JSON response from FakeStore API');
  }
  return response.json();
}

function withProductFallback(loader, fallback) {
  return loader().catch(() => fallback());
}

export const productsApi = {
  getAll: () =>
    withProductFallback(
      () => request('/products'),
      async () => localProducts
    ),
  getById: (id) =>
    withProductFallback(
      () => request(`/products/${id}`),
      async () => {
        const product = localProducts.find((item) => String(item.id) === String(id));
        if (!product) throw new Error('Product not found');
        return product;
      }
    ),
  create: (data) =>
    request('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

export const cartsApi = {
  getAll: () => request('/carts'),
  getById: (id) => request(`/carts/${id}`),
  create: (data) =>
    request('/carts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/carts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/carts/${id}`, { method: 'DELETE' }),
};

export const usersApi = {
  getAll: () => request('/users'),
  getById: (id) => request(`/users/${id}`),
  create: (data) =>
    request('/users', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) =>
    request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  remove: (id) => request(`/users/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  login: async (credentials) => {
    try {
      return await request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    } catch {
      // FakeStore is often blocked by Cloudflare from browsers; keep demo login working.
      if (credentials?.username && credentials?.password) {
        return { token: 'demo-local-token' };
      }
      throw new Error('Login failed');
    }
  },
};
