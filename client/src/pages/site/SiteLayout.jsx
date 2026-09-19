import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Brand } from '../../components/ui';
import { SiteLink } from '../../components/SiteLink';
import { navItems } from '../../data/siteContent';
import { navigate } from '../../router';

export default function SiteLayout({ path, children }) {
  useEffect(() => { const page = navItems.find((item) => item.path === path); document.title = page && page.path !== '/' ? `${page.label} · StudyFlow` : 'StudyFlow'; }, [path]);
  return <main className="lp">
    <header className="lp-nav">
      <SiteLink to="/" className="lp-brand" aria-label="StudyFlow home"><Brand /></SiteLink>
      <nav className="lp-pill" aria-label="Pages">{navItems.map(({ path: to, label, icon: Icon, color }) => <SiteLink key={to} to={to} className={path === to ? 'active' : ''} style={{ '--tone': color }} aria-current={path === to ? 'page' : undefined}><Icon size={18} /><span>{label}</span></SiteLink>)}</nav>
      <div className="lp-nav-actions"><button className="lp-login" onClick={() => navigate('/login')}>Log in <ChevronRight size={16} /></button><button className="lp-signup" onClick={() => navigate('/register')}><Sparkles size={14} /> Start planning</button></div>
    </header>
    <motion.div key={path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, ease: 'easeOut' }}>{children}</motion.div>
    <footer className="lp-footer">
      <Brand /><nav>{navItems.map(({ path: to, label }) => <SiteLink key={to} to={to}>{label}</SiteLink>)}</nav><div><button onClick={() => navigate('/login')}>Log in</button><button onClick={() => navigate('/register')}>Create account</button></div>
      <small>© 2026 StudyFlow. Made for focused learners.</small>
    </footer>
  </main>;
}

export function CtaBand({ title = 'Ready to build a study rhythm you can keep?', text = 'Create your StudyFlow space in under a minute.' }) {
  return <section className="lp-cta-band"><div><Sparkles size={34} /><h2>{title}</h2><p>{text}</p><div><button className="lp-primary light" onClick={() => navigate('/register')}>Create your account</button><button className="lp-ghost light" onClick={() => navigate('/login')}>Log in</button></div></div></section>;
}
