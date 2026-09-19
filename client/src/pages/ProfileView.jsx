import { useState } from 'react';
import { BookOpen, CalendarDays, CircleHelp, CircleUserRound, Clock3, GraduationCap, ListChecks, Mail, NotebookPen, Pencil, Save, Sparkles, Trophy, UserRound, Wallet, X, Flame } from 'lucide-react';
import toast from 'react-hot-toast';
import { EmptyState } from '../components/ui';
import { formatDay, dateKey, initials, money } from '../utils';

export default function ProfileView({ user, badges, stats, onNavigate, updateProfile }) {
  const [editing, setEditing] = useState(false); const [form, setForm] = useState({ name: user.name, university: user.university || '', bio: user.bio || '' }); const [busy, setBusy] = useState(false);
  const set = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const startEdit = () => { setForm({ name: user.name, university: user.university || '', bio: user.bio || '' }); setEditing(true); };
  async function save(event) {
    event.preventDefault(); setBusy(true);
    try { await updateProfile(form); toast.success('Profile updated'); setEditing(false); } catch (error) { toast.error(error.response?.data?.message || 'Could not update profile'); } finally { setBusy(false); }
  }
  const activity = [
    { id: 'planner', icon: ListChecks, tint: '#f97316', label: 'Tasks completed', value: `${stats.tasksDone} / ${stats.tasksTotal}` },
    { id: 'schedule', icon: CalendarDays, tint: '#2563eb', label: 'Classes scheduled', value: stats.classes },
    { id: 'budget', icon: Wallet, tint: '#059669', label: 'Balance this month', value: money(stats.balance) },
    { id: 'exam', icon: CircleHelp, tint: '#7c3aed', label: 'Quiz average', value: stats.quizzes ? `${stats.quizAverage}%` : '—' },
    { id: 'timer', icon: Clock3, tint: '#0891b2', label: 'Focus minutes (7 days)', value: stats.focusMinutes },
    { id: 'profile', icon: Trophy, tint: '#ca8a04', label: 'Badges earned', value: badges.length }
  ];
  const details = [
    { icon: UserRound, label: 'Full name', value: user.name }, { icon: Mail, label: 'Email', value: user.email },
    { icon: GraduationCap, label: 'University', value: user.university || 'Not added yet' }, { icon: NotebookPen, label: 'About', value: user.bio || 'Not added yet' },
    { icon: CalendarDays, label: 'Member since', value: user.createdAt ? formatDay(dateKey(user.createdAt), { month: 'long', day: 'numeric', year: 'numeric' }) : '—' },
    { icon: Wallet, label: 'Monthly budget', value: user.monthlyBudget > 0 ? money(user.monthlyBudget) : 'Not set' }
  ];
  return <div className="profile-page fx-page">
    <section className="profile-banner"><div className="profile-avatar big">{initials(user.name)}</div><div><p className="eyebrow">YOUR PROFILE</p><h1>{user.name}</h1><p>{user.email}</p><div className="profile-chips"><span><GraduationCap size={14} /> {user.university || 'Student'}</span><span><Flame size={14} /> {stats.quizzes} quizzes taken</span><span><Sparkles size={14} /> {badges.length} {badges.length === 1 ? 'badge' : 'badges'}</span></div></div></section>
    <div className="profile-columns">
      <section className="fx-card"><div className="fx-card-head"><h2 className="fx-card-title"><CircleUserRound size={18} /> Account details</h2>{!editing && <button className="fx-btn muted small" onClick={startEdit}><Pencil size={15} /> Edit</button>}</div>
        {editing ? <form className="fx-form single" onSubmit={save}><label>Full name<input required maxLength="80" value={form.name} onChange={set('name')} /></label><label>University / School<input maxLength="100" value={form.university} onChange={set('university')} placeholder="Where do you study?" /></label><label>About you<textarea rows="3" maxLength="300" value={form.bio} onChange={set('bio')} placeholder="A short line about your goals" /></label><div className="fx-form-actions"><button className="fx-btn brand" disabled={busy}><Save size={16} /> {busy ? 'Saving...' : 'Save changes'}</button><button type="button" className="fx-btn muted" onClick={() => setEditing(false)}><X size={16} /> Cancel</button></div></form>
          : <dl className="detail-list">{details.map(({ icon: Icon, label, value }) => <div key={label}><span><Icon size={17} /></span><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
      </section>
      <section className="fx-card"><h2 className="fx-card-title"><Sparkles size={18} /> Activity summary</h2><div className="activity-grid">{activity.map(({ id, icon: Icon, tint, label, value }) => <button key={label} className="activity-tile" style={{ '--tint': tint }} onClick={() => onNavigate(id)}><span><Icon size={18} /></span><strong>{value}</strong><small>{label}</small></button>)}</div></section>
    </div>
    <section className="panel badges-panel"><div className="panel-heading"><div><p className="eyebrow">ACHIEVEMENTS</p><h3>Badges you have earned</h3></div><Sparkles color="#f4b942" /></div><div className="badges-grid">{badges.length ? badges.map((badge) => <div className="badge-card" key={badge.badgeType}><div className="badge-icon"><Trophy size={20} /></div><strong>{badge.badgeType}</strong><small>Unlocked achievement</small></div>) : <EmptyState compact text="Complete tasks to unlock your first badge." />}</div></section>
  </div>;
}
