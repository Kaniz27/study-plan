import { useEffect, useState } from 'react';

const currentPath = () => window.location.pathname.replace(/\/+$/, '') || '/';

export function navigate(to, { replace = false } = {}) {
  if (to === currentPath() && !replace) return window.scrollTo({ top: 0, behavior: 'smooth' });
  window.history[replace ? 'replaceState' : 'pushState']({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}

export function useRoute() {
  const [path, setPath] = useState(currentPath);
  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  return path;
}
