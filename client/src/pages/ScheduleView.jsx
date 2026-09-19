import { useMemo, useState } from 'react';
import { CalendarCheck2, CalendarDays, Clock3, Filter, MapPin, Pencil, Plus, Search, Trash2, UserRound, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { EmptyState, FormModal, PageHeader, StatTile } from '../components/ui';
import { accentFor, dateKey, formatDay, formatTime, todayKey } from '../utils';

const blank = () => ({ subject: '', instructor: '', description: '', location: '', date: todayKey(), startTime: '09:00', endTime: '10:00' });
const byTime = (a, b) => (a.startTime || '').localeCompare(b.startTime || '');
const sorters = {
  date: (a, b) => dateKey(a.date).localeCompare(dateKey(b.date)) || byTime(a, b),
  subject: (a, b) => a.subject.localeCompare(b.subject),
  instructor: (a, b) => (a.instructor || '').localeCompare(b.instructor || ''),
  time: byTime
};
const sortLabels = { date: 'Date', subject: 'Subject', instructor: 'Instructor', time: 'Start time' };

function statusOf(item) {
  const day = dateKey(item.date); const today = todayKey();
  return day < today ? { label: 'Past', tone: 'past' } : day === today ? { label: 'Today', tone: 'today' } : { label: 'Upcoming', tone: 'soon' };
}

export default function ScheduleView({ schedules }) {
  const [query, setQuery] = useState(''); const [sortBy, setSortBy] = useState('date'); const [order, setOrder] = useState('desc'); const [modal, setModal] = useState(null);
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matches = schedules.items.filter((item) => !needle || [item.subject, item.instructor, item.description, item.location].some((field) => (field || '').toLowerCase().includes(needle)));
    return matches.sort((a, b) => sorters[sortBy](a, b) * (order === 'asc' ? 1 : -1));
  }, [schedules.items, query, sortBy, order]);
  const today = todayKey();
  const todayCount = schedules.items.filter((item) => dateKey(item.date) === today).length;
  const upcoming = schedules.items.filter((item) => dateKey(item.date) > today).length;
  const filtersActive = query || sortBy !== 'date' || order !== 'desc';
  const clear = () => { setQuery(''); setSortBy('date'); setOrder('desc'); };

  async function remove(item) {
    if (!window.confirm(`Delete “${item.subject}”?`)) return;
    try { await schedules.remove(item._id); toast.success('Schedule deleted'); } catch { toast.error('Could not delete schedule'); }
  }

  return <div className="fx-page theme-schedule">
    <PageHeader icon={CalendarDays} title="My Schedule" subtitle="Manage your class schedule and study sessions" />
    <div className="fx-stats"><StatTile icon={CalendarDays} label="Total classes" value={schedules.items.length} tint="#2563eb" /><StatTile icon={Clock3} label="Today" value={todayCount} tint="#ea580c" /><StatTile icon={CalendarCheck2} label="Upcoming" value={upcoming} tint="#059669" /></div>
    <section className="fx-card fx-filters">
      <label>Search Schedules<span className="fx-input-icon"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by subject, instructor, or description..." /></span></label>
      <label>Sort By<span className="fx-input-icon"><Filter size={17} /><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>{Object.entries(sortLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></span></label>
      <label>Order<select value={order} onChange={(event) => setOrder(event.target.value)}><option value="desc">Descending</option><option value="asc">Ascending</option></select></label>
      <div className="fx-filter-actions"><button className="fx-btn slate" onClick={clear} disabled={!filtersActive}><X size={17} /> Clear Filters</button><button className="fx-btn brand" onClick={() => setModal(blank())}><Plus size={17} /> Add New Schedule</button></div>
    </section>
    {schedules.loading ? <div className="fx-card"><div className="spinner" style={{ margin: '40px auto' }} /></div> : filtered.length ? <div className="schedule-grid">{filtered.map((item) => { const status = statusOf(item); const accent = accentFor(item.subject); return <article className="schedule-card" key={item._id} style={{ '--accent': accent }}>
      <div className="schedule-card-top"><span className="schedule-date"><b>{formatDay(dateKey(item.date), { day: 'numeric' })}</b>{formatDay(dateKey(item.date), { month: 'short' })}</span><div className="schedule-title"><h3>{item.subject}</h3><span className={`status-pill ${status.tone}`}>{status.label}</span></div><div className="row-actions"><button className="icon-button" title="Edit schedule" onClick={() => setModal({ ...item, date: dateKey(item.date) })}><Pencil size={16} /></button><button className="icon-button danger" title="Delete schedule" onClick={() => remove(item)}><Trash2 size={16} /></button></div></div>
      <ul className="schedule-meta">{(item.startTime || item.endTime) && <li><Clock3 size={14} />{formatTime(item.startTime)}{item.endTime && ` – ${formatTime(item.endTime)}`}</li>}{item.instructor && <li><UserRound size={14} />{item.instructor}</li>}{item.location && <li><MapPin size={14} />{item.location}</li>}<li><CalendarDays size={14} />{formatDay(dateKey(item.date), { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</li></ul>
      {item.description && <p className="schedule-note">{item.description}</p>}
    </article>; })}</div> : <section className="fx-card"><EmptyState text={schedules.items.length ? 'No schedules match your search.' : 'No schedules yet. Add your first class or study session!'} />{!schedules.items.length && <div className="fx-center"><button className="fx-btn brand" onClick={() => setModal(blank())}><Plus size={17} /> Add New Schedule</button></div>}</section>}
    {modal && <ScheduleModal initial={modal} onClose={() => setModal(null)} onSave={async (values) => { await schedules.save(values, modal._id); setModal(null); toast.success(modal._id ? 'Schedule updated' : 'Schedule added'); }} />}
  </div>;
}

function ScheduleModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial); const [busy, setBusy] = useState(false);
  const set = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  async function submit() {
    if (form.startTime && form.endTime && form.endTime <= form.startTime) return toast.error('End time must be after the start time');
    setBusy(true);
    try { await onSave({ subject: form.subject, instructor: form.instructor, description: form.description, location: form.location, date: form.date, startTime: form.startTime, endTime: form.endTime }); } catch (error) { toast.error(error.response?.data?.message || 'Could not save schedule'); setBusy(false); }
  }
  return <FormModal eyebrow="SCHEDULE DETAILS" title={initial._id ? 'Edit schedule' : 'New schedule'} submitLabel="Save schedule" busy={busy} onClose={onClose} onSubmit={submit}>
    <label>Subject<input required autoFocus value={form.subject} onChange={set('subject')} placeholder="e.g., Database Systems" /></label>
    <div className="form-grid"><label>Instructor<input value={form.instructor} onChange={set('instructor')} placeholder="e.g., Dr. Rahman" /></label><label>Location<input value={form.location} onChange={set('location')} placeholder="e.g., Room 204" /></label></div>
    <label>Date<input required type="date" value={form.date} onChange={set('date')} /></label>
    <div className="form-grid"><label>Start time<input type="time" value={form.startTime} onChange={set('startTime')} /></label><label>End time<input type="time" value={form.endTime} onChange={set('endTime')} /></label></div>
    <label>Description<textarea rows="3" value={form.description} onChange={set('description')} placeholder="Topics, homework, reminders..." /></label>
  </FormModal>;
}
