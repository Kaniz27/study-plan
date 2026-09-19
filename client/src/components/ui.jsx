import { BookOpen, Save, X } from 'lucide-react';

export function Brand() {
  return <div className="brand-mark"><span className="brand-logo"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3.5 7.6c2.6-1.5 5.6-1.5 8.5 0 2.9-1.5 5.9-1.5 8.5 0v11c-2.6-1.5-5.6-1.5-8.5 0-2.9-1.5-5.9-1.5-8.5 0z" /><path d="M12 7.6v11" /><path d="M19 1.6l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z" fill="currentColor" strokeWidth=".6" /></svg></span> StudyFlow</div>;
}

export function PageHeader({ icon: Icon, title, subtitle, children }) {
  return <header className="fx-header"><span className="fx-header-icon"><Icon size={28} /></span><h1>{title}</h1><p>{subtitle}</p>{children}</header>;
}

export function EmptyState({ text, compact = false }) {
  return <div className={`empty-state ${compact ? 'compact' : ''}`}><BookOpen size={compact ? 22 : 30} /><p>{text}</p></div>;
}

export function FormModal({ eyebrow, title, submitLabel = 'Save', busy = false, onClose, onSubmit, children }) {
  return <div className="modal-backdrop"><form className="modal" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}><div className="modal-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div><button type="button" className="icon-button" onClick={onClose}><X size={20} /></button></div>{children}<div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button className="primary-button" disabled={busy}><Save size={17} /> {busy ? 'Saving...' : submitLabel}</button></div></form></div>;
}

export function StatTile({ icon: Icon, label, value, tint }) {
  return <div className="fx-stat" style={{ '--tint': tint }}><span className="fx-stat-icon"><Icon size={20} /></span><div><strong>{value}</strong><small>{label}</small></div></div>;
}
