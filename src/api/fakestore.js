const BASE_URL = 'https://fakestoreapi.com';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const productsApi = {
  getAll: () => request('/products'),
  getById: (id) => request(`/products/${id}`),
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
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
};
