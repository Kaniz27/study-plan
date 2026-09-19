import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BookOpen, ChevronDown, CircleHelp, ExternalLink, FileText, Play, Target, Trash2, TrendingUp, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';
import { EmptyState, PageHeader, StatTile } from '../components/ui';
import QuizGenerator from './QuizGenerator';
import { materials } from '../data/materials';
import { accentFor, dateKey, formatDay, percentOf } from '../utils';

const tabs = [{ id: 'quiz', label: 'Quiz Generator', icon: FileText }, { id: 'materials', label: 'Study Materials', icon: BookOpen }, { id: 'progress', label: 'Progress', icon: TrendingUp }];

export default function ExamView({ attempts }) {
  const [tab, setTab] = useState('quiz'); const [preset, setPreset] = useState(null);
  const practice = (category) => { setPreset({ categories: [category] }); setTab('quiz'); };
  return <div className="fx-page theme-exam">
    <PageHeader icon={CircleHelp} title="Exam Q&A" subtitle="Generate quizzes, revise key topics and track how you improve" />
    <nav className="fx-tabs">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}><Icon size={17} /> {label}</button>)}</nav>
    <section className="fx-card exam-panel">
      <div hidden={tab !== 'quiz'}><QuizGenerator attempts={attempts} preset={preset} /></div>
      {tab === 'materials' && <Materials onPractice={practice} />}
      {tab === 'progress' && <Progress attempts={attempts} onStart={() => setTab('quiz')} />}
    </section>
  </div>;
}

function Materials({ onPractice }) {
  const [open, setOpen] = useState({});
  return <div className="materials-grid">{materials.map((subject) => <article className="material-card" key={subject.category} style={{ '--tint': subject.tint }}>
    <header><span className="material-badge">{subject.title.slice(0, 2)}</span><div><h3>{subject.title}</h3><p>{subject.tagline}</p></div></header>
    <div className="topic-list">{subject.topics.map((topic) => { const key = `${subject.category}-${topic.name}`; return <div className={`topic ${open[key] ? 'open' : ''}`} key={key}><button onClick={() => setOpen({ ...open, [key]: !open[key] })}>{topic.name}<ChevronDown size={16} /></button>{open[key] && <ul>{topic.points.map((point) => <li key={point}>{point}</li>)}</ul>}</div>; })}</div>
    <footer><button className="fx-btn brand small" onClick={() => onPractice(subject.category)}><Play size={15} /> Practice quiz</button><a className="fx-btn muted small" href={subject.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={15} /> Docs</a></footer>
  </article>)}</div>;
}

function Progress({ attempts, onStart }) {
  const items = useMemo(() => [...attempts.items].sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)) || String(a.createdAt).localeCompare(String(b.createdAt))), [attempts.items]);
  if (!items.length) return <div className="progress-empty"><EmptyState text="No quiz attempts yet. Take your first quiz to start tracking progress." /><div className="fx-center"><button className="fx-btn brand" onClick={onStart}><Play size={16} /> Take a quiz</button></div></div>;
  const scores = items.map((item) => ({ label: formatDay(dateKey(item.date), { month: 'short', day: 'numeric' }), score: percentOf(item.correct, item.total) }));
  const totalCorrect = items.reduce((sum, item) => sum + item.correct, 0); const totalQuestions = items.reduce((sum, item) => sum + item.total, 0);
  const perCategory = {}; items.forEach((item) => (item.breakdown || []).forEach((row) => { const entry = perCategory[row.category] || { correct: 0, total: 0 }; entry.correct += row.correct; entry.total += row.total; perCategory[row.category] = entry; }));
  async function remove(item) { if (!window.confirm('Delete this attempt?')) return; try { await attempts.remove(item._id); toast.success('Attempt deleted'); } catch { toast.error('Could not delete attempt'); } }
  return <div className="progress-view">
    <div className="fx-stats four"><StatTile icon={FileText} label="Quizzes taken" value={items.length} tint="#7c3aed" /><StatTile icon={Target} label="Average score" value={`${percentOf(totalCorrect, totalQuestions)}%`} tint="#2563eb" /><StatTile icon={Trophy} label="Best score" value={`${Math.max(...scores.map((row) => row.score))}%`} tint="#ca8a04" /><StatTile icon={CircleHelp} label="Questions answered" value={totalQuestions} tint="#059669" /></div>
    <div className="progress-grid">
      <div className="progress-box"><h4>Score trend</h4><ResponsiveContainer width="100%" height={220}><AreaChart data={scores.slice(-12)}><defs><linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity=".45" /><stop offset="100%" stopColor="#7c3aed" stopOpacity="0" /></linearGradient></defs><CartesianGrid vertical={false} stroke="#e7e4df" /><XAxis dataKey="label" axisLine={false} tickLine={false} fontSize={11} /><YAxis domain={[0, 100]} unit="%" axisLine={false} tickLine={false} fontSize={11} width={42} /><Tooltip formatter={(value) => `${value}%`} /><Area type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={3} fill="url(#scoreFill)" /></AreaChart></ResponsiveContainer></div>
      <div className="progress-box"><h4>Accuracy by topic</h4><div className="category-bars">{Object.entries(perCategory).map(([name, row]) => <div key={name}><div className="category-row"><span>{name}</span><b>{percentOf(row.correct, row.total)}%</b></div><div className="progress-track"><div style={{ width: `${percentOf(row.correct, row.total)}%`, background: accentFor(name) }} /></div></div>)}</div></div>
    </div>
    <div className="progress-box"><h4>Recent attempts</h4><div className="attempt-list">{[...items].reverse().slice(0, 8).map((item) => <div className="attempt-row" key={item._id}><span className="attempt-score" style={{ '--pct': percentOf(item.correct, item.total) }}>{percentOf(item.correct, item.total)}%</span><div><strong>{item.categories.join(', ')}</strong><small>{item.correct}/{item.total} correct · {item.difficulty} · {formatDay(dateKey(item.date))}</small></div><button className="icon-button danger" title="Delete attempt" onClick={() => remove(item)}><Trash2 size={16} /></button></div>)}</div></div>
  </div>;
}
