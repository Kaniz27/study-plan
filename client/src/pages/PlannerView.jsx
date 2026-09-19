import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CalendarDays, Check, CheckCircle2, Circle, Clock3, Droplet, Filter, ListChecks, Pencil, Plus, Save, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import { EmptyState, PageHeader } from '../components/ui';
import { dateKey, formatDay, formatTime, todayKey } from '../utils';

const swatches = ['#3b82f6', '#7c3aed', '#ec4899', '#f97316', '#10b981', '#eab308'];
const tips = ['Break large topics into smaller, manageable tasks', 'Set realistic time estimates for each session', 'Use colors to categorize subjects or priority levels', 'Add specific notes to remember important details'];
const blank = () => ({ title: '', dueDate: todayKey(), startTime: '', duration: '', color: '#3b82f6', notes: '' });
const duration = (minutes) => minutes >= 60 ? `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}` : `${minutes} min`;

export default function PlannerView({ tasks, setTasks, onToggle, onDelete }) {
  const [mode, setMode] = useState('manager'); const [editing, setEditing] = useState(null);
  const openForm = (task = null) => { setEditing(task); setMode('form'); };
  const saved = (task, isEdit) => { setTasks((current) => isEdit ? current.map((item) => item._id === task._id ? task : item) : [task, ...current]); setMode('manager'); setEditing(null); toast.success(isEdit ? 'Task updated' : 'Task added to your planner'); };
  return mode === 'form' ? <TaskPlanner editing={editing} onBack={() => { setMode('manager'); setEditing(null); }} onSaved={saved} /> : <TaskManager tasks={tasks} onAdd={() => openForm()} onEdit={openForm} onToggle={onToggle} onDelete={onDelete} />;
}

function TaskManager({ tasks, onAdd, onEdit, onToggle, onDelete }) {
  const [query, setQuery] = useState(''); const [status, setStatus] = useState('all');
  const done = tasks.filter((task) => task.isCompleted).length;
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return tasks.filter((task) => (status === 'all' || (status === 'completed') === task.isCompleted) && (!needle || `${task.title} ${task.notes || ''}`.toLowerCase().includes(needle)))
      .sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted) || dateKey(a.dueDate || '9999-12-31').localeCompare(dateKey(b.dueDate || '9999-12-31')) || (a.startTime || '').localeCompare(b.startTime || ''));
  }, [tasks, query, status]);
  return <div className="fx-page theme-planner">
    <header className="fx-header row"><div className="fx-header-lead"><span className="fx-header-icon"><ListChecks size={26} /></span><div><h1>Task Manager</h1><p>Organize and track your study tasks efficiently</p></div></div><button className="fx-btn brand" onClick={onAdd}><Plus size={18} /> Add New Task</button></header>
    <section className="fx-card fx-filters two"><label>Search Tasks<span className="fx-input-icon"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title or notes..." /></span></label><label>Filter by Status<span className="fx-input-icon"><Filter size={17} /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">All Tasks</option><option value="pending">Pending</option><option value="completed">Completed</option></select></span></label></section>
    <div className="planner-stats"><div className="blue"><div><strong>{tasks.length}</strong><small>Total Tasks</small></div><span><ListChecks size={22} /></span></div><div className="green"><div><strong>{done}</strong><small>Completed</small></div><span><CheckCircle2 size={22} /></span></div><div className="yellow"><div><strong>{tasks.length - done}</strong><small>Pending</small></div><span><Circle size={22} /></span></div></div>
    {visible.length ? <div className="planner-list">{visible.map((task) => <article className={`planner-task ${task.isCompleted ? 'done' : ''}`} key={task._id} style={{ '--task': task.color || '#3b82f6' }}>
      <button className={`task-check ${task.isCompleted ? 'done' : ''}`} onClick={() => onToggle(task)} title={task.isCompleted ? 'Mark as pending' : 'Mark as completed'}>{task.isCompleted && <Check size={15} />}</button>
      <div className="planner-info"><strong>{task.title}</strong><div className="planner-meta">{task.dueDate && <span><CalendarDays size={13} /> {formatDay(dateKey(task.dueDate))}</span>}{task.startTime && <span><Clock3 size={13} /> {formatTime(task.startTime)}</span>}{task.duration && <span>{duration(task.duration)}</span>}{task.subject && task.subject !== 'Others' && <span className="subject-pill">{task.subject}</span>}</div>{task.notes && <p>{task.notes}</p>}</div>
      <div className="row-actions"><button className="icon-button" title="Edit task" onClick={() => onEdit(task)}><Pencil size={16} /></button><button className="icon-button danger" title="Delete task" onClick={() => onDelete(task)}><Trash2 size={16} /></button></div>
    </article>)}</div> : <section className="fx-card"><EmptyState text={tasks.length ? 'No tasks match your search or filter.' : 'No tasks yet — get started by creating your first task!'} />{!tasks.length && <div className="fx-center"><button className="fx-btn brand" onClick={onAdd}><Plus size={17} /> Add New Task</button></div>}</section>}
  </div>;
}

function TaskPlanner({ editing, onBack, onSaved }) {
  const [form, setForm] = useState(editing ? { title: editing.title, dueDate: dateKey(editing.dueDate) || todayKey(), startTime: editing.startTime || '', duration: editing.duration || '', color: editing.color || '#3b82f6', notes: editing.notes || '' } : blank());
  const [busy, setBusy] = useState(false);
  const set = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  async function submit(event) {
    event.preventDefault(); setBusy(true);
    const payload = { title: form.title, dueDate: form.dueDate, startTime: form.startTime, duration: Number(form.duration), color: form.color, notes: form.notes, priority: editing?.priority || 'Medium', subject: editing?.subject || 'Others' };
    try { const { data } = editing ? await api.put(`/tasks/${editing._id}`, payload) : await api.post('/tasks', payload); onSaved(data.task, Boolean(editing)); } catch (error) { toast.error(error.response?.data?.message || 'Could not save task'); setBusy(false); }
  }
  return <div className="fx-page theme-planner">
    <header className="fx-header row"><div className="fx-header-lead"><span className="fx-header-icon"><Plus size={26} /></span><div><h1>Task Planner</h1><p>Schedule and organize your study tasks efficiently</p></div></div><button className="fx-btn green" onClick={onBack}><ListChecks size={16} /> View All Tasks <ArrowRight size={16} /></button></header>
    <section className="fx-card"><h2 className="fx-card-title"><BookOpen size={18} /> {editing ? 'Edit Task' : 'Add New Task'}</h2>
      <form className="fx-form planner-form" onSubmit={submit}>
        <label className="wide">Task Title *<input required maxLength="160" value={form.title} onChange={set('title')} placeholder="e.g., Study React Hooks, Math Homework" /></label>
        <label>Date *<input required type="date" value={form.dueDate} onChange={set('dueDate')} /></label>
        <label>Time *<input required type="time" value={form.startTime} onChange={set('startTime')} /></label>
        <label>Duration (minutes) *<input required type="number" min="1" max="1440" value={form.duration} onChange={set('duration')} placeholder="e.g., 30" /></label>
        <div className="color-field"><span className="fx-label"><Droplet size={14} /> Color Theme</span><div className="swatches"><input type="color" aria-label="Custom color" value={form.color} onChange={set('color')} />{swatches.map((color) => <button type="button" key={color} aria-label={`Use color ${color}`} className={form.color === color ? 'on' : ''} style={{ background: color }} onClick={() => setForm({ ...form, color })} />)}</div></div>
        <label className="wide">Notes<textarea rows="4" maxLength="1000" value={form.notes} onChange={set('notes')} placeholder="Add details about your task (e.g., Online class, Chapter 5, Important concepts...)" /></label>
        <button className="fx-btn brand block wide" disabled={busy}><Save size={17} /> {busy ? 'Saving...' : editing ? 'Save Changes' : 'Add Task'}</button>
      </form>
      <div className="planner-tips"><h4><BookOpen size={15} /> Tips for Effective Task Planning</h4><ul>{tips.map((tip) => <li key={tip}>{tip}</li>)}</ul></div>
    </section>
  </div>;
}
