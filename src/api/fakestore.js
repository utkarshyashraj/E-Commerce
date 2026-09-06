import localProducts from '../data/products.json';

const BASE_URL = 'https://fakestoreapi.com';
const API_TIMEOUT_MS = 3500;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('Unexpected non-JSON response from FakeStore API');
    }

    return response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function loadProducts() {
  // Prefer live API when it responds quickly; otherwise use bundled catalog.
  // FakeStore is often Cloudflare-blocked in browsers, which can hang forever.
  const remote = request('/products').catch(() => null);
  const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 1500));
  const data = await Promise.race([remote, timeout]);
  return Array.isArray(data) && data.length ? data : localProducts;
}

export const productsApi = {
  getAll: () => loadProducts(),
  getById: async (id) => {
    try {
      return await request(`/products/${id}`);
    } catch {
      const product = localProducts.find((item) => String(item.id) === String(id));
      if (!product) throw new Error('Product not found');
      return product;
    }
  },
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
      if (credentials?.username && credentials?.password) {
        return { token: 'demo-local-token' };
      }
      throw new Error('Login failed');
    }
  },
};
