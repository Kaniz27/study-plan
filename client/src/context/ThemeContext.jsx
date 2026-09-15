import { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('studyflow-theme') === 'dark');
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('studyflow-theme', dark ? 'dark' : 'light'); }, [dark]);
  return <ThemeContext.Provider value={{ dark, toggleTheme: () => setDark((value) => !value) }}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => useContext(ThemeContext);
