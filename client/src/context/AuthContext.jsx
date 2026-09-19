import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => {}).finally(() => setLoading(false)); }, []);
  const login = async (credentials) => { const { data } = await api.post('/auth/login', credentials); setUser(data.user); return data.user; };
  const register = async (details) => { const { data } = await api.post('/auth/register', details); setUser(data.user); return data.user; };
  const updateProfile = async (changes) => { const { data } = await api.put('/auth/profile', changes); setUser(data.user); return data.user; };
  const logout =async () => { await api.post('/auth/logout').catch(() => {}); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, updateProfile, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
