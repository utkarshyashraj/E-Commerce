import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../api/fakestore.js';

const AuthContext = createContext(null);
const STORAGE_KEY = 'shopsphere.auth.v1';

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (auth) localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
    else localStorage.removeItem(STORAGE_KEY);
  }, [auth]);

  const value = useMemo(
    () => ({
      user: auth,
      isAuthenticated: Boolean(auth?.token),
      login: async ({ username, password }) => {
        const result = await authApi.login({ username, password });
        const next = { username, token: result?.token ?? 'demo-token' };
        setAuth(next);
        return next;
      },
      logout: () => setAuth(null),
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
