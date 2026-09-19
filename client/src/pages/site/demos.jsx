import { useState } from 'react';
import { Check, Clock3, MapPin, RotateCcw, Timer, UserRound } from 'lucide-react';
import { questionBank } from '../../data/questions';

const weekDays = [
  { key: 'Mon', classes: [['10', 'AM', 'Database Systems', '10:00 – 11:30 AM', 'Dr. Rahman', 'Room 204', '#2563eb'], ['2', 'PM', 'Web Development Lab', '2:00 – 3:30 PM', 'Ms. Chowdhury', 'Lab 3', '#7c3aed']] },
  { key: 'Tue', classes: [['9', 'AM', 'Discrete Mathematics', '9:00 – 10:00 AM', 'Prof. Ahmed', 'Room 110', '#db2777']] },
  { key: 'Wed', classes: [['11', 'AM', 'Computer Networks', '11:00 AM – 12:00 PM', 'Dr. Sultana', 'Room 305', '#0891b2'], ['4', 'PM', 'Study session: React', '4:00 – 5:00 PM', 'Self study', 'Library', '#ea580c']] },
  { key: 'Thu', classes: [] },
  { key: 'Fri', classes: [['10', 'AM', 'Database Systems', '10:00 – 11:30 AM', 'Dr. Rahman', 'Room 204', '#2563eb']] },
  { key: 'Sat', classes: [['11', 'AM', 'Group project meeting', '11:00 AM – 12:30 PM', 'Team StudyFlow', 'Café', '#059669']] },
  { key: 'Sun', classes: [] }
];

export function ScheduleDemo() {
  const [day, setDay] = useState('Wed');
  const selected = weekDays.find((item) => item.key === day);
  return <div className="mock-card">
    <div className="mock-week">{weekDays.map((item) => <button key={item.key} className={`${item.key === day ? 'now' : ''} ${item.classes.length ? 'dot' : ''}`} onClick={() => setDay(item.key)}>{item.key[0]}<i /></button>)}</div>
    <p className="demo-caption">{selected.classes.length ? `${selected.classes.length} ${selected.classes.length === 1 ? 'session' : 'sessions'} on ${selected.key}` : `Nothing planned on ${selected.key} — a free day!`}</p>
    {selected.classes.map(([hour, period, subject, time, teacher, room, color]) => <div className="mock-class" key={subject} style={{ '--c': color }}><span className="mock-date"><b>{hour}</b>{period}</span><div><strong>{subject}</strong><small><Clock3 size={12} /> {time}</small><small><UserRound size={12} /> {teacher}</small><small><MapPin size={12} /> {room}</small></div></div>)}
  </div>;
}

const expenses = [['Lunch', 12], ['Textbook', 45], ['Bus pass', 20]];
const dollars = (value) => `$${Math.round(value).toLocaleString('en-US')}`;

export function BudgetDemo() {
  const [limit, setLimit] = useState(500); const [spent, setSpent] = useState(120);
  const over = spent > limit; const ratio = Math.min(1, spent / limit);
  return <div className="mock-card">
    <div className="mock-donut"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="#e5e7eb" strokeWidth="16" /><circle cx="60" cy="60" r="48" fill="none" stroke={over ? '#f43f5e' : '#10b981'} strokeWidth="16" strokeLinecap="round" strokeDasharray={`${ratio * 301.6} 301.6`} transform="rotate(-90 60 60)" style={{ transition: 'stroke-dasharray .4s ease, stroke .3s' }} /></svg><div><small>{over ? 'Over budget by' : 'Left this month'}</small><strong>{dollars(Math.abs(limit - spent))}</strong></div></div>
    <label className="demo-slider">Monthly budget <b>{dollars(limit)}</b><input type="range" min="100" max="1500" step="50" value={limit} onChange={(event) => setLimit(Number(event.target.value))} /></label>
    <label className="demo-slider">Spent so far <b>{dollars(spent)}</b><input type="range" min="0" max="1500" step="5" value={spent} onChange={(event) => setSpent(Number(event.target.value))} /></label>
    <div className="demo-chips">{expenses.map(([name, amount]) => <button key={name} onClick={() => setSpent(Math.min(1500, spent + amount))}>+ {name} <b>${amount}</b></button>)}<button className="reset" onClick={() => setSpent(0)}><RotateCcw size={13} /> Reset</button></div>
    <div className={`mock-banner ${over ? 'bad' : ''}`}><Check size={15} /> {over ? 'You are over budget' : 'You are within budget'}</div>
  </div>;
}

const sample = ['Javascript-5', 'Html-1', 'React-1'].map((id) => questionBank.find((item) => item.id === id));

export function ExamDemo() {
  const [index, setIndex] = useState(0); const [picked, setPicked] = useState(null); const [score, setScore] = useState(0);
  if (index >= sample.length) return <div className="mock-card demo-result"><strong>{score} / {sample.length}</strong><p>{score === sample.length ? 'Perfect score! 🎉' : 'Nice try — practise more in the full quiz.'}</p><button className="demo-btn" onClick={() => { setIndex(0); setPicked(null); setScore(0); }}><RotateCcw size={15} /> Try again</button></div>;
  const question = sample[index];
  const choose = (option) => { if (picked !== null) return; setPicked(option); if (option === question.answer) setScore(score + 1); };
  return <div className="mock-card">
    <div className="mock-quiz-top"><span>Question {index + 1} of {sample.length}</span><b><Timer size={13} /> Try it</b></div>
    <div className="mock-quiz-bar"><i style={{ width: `${((index + 1) / sample.length) * 100}%` }} /></div>
    <div className="mock-tags"><span>Q{index + 1}</span><span>{question.category}</span><span className="hot">{question.difficulty}</span></div>
    <h4>{question.q}</h4>
    {question.options.map((option, position) => <button key={option} className={`mock-option ${picked === position ? 'picked' : ''} ${picked !== null && position === question.answer ? 'right' : ''} ${picked === position && position !== question.answer ? 'wrong' : ''}`} onClick={() => choose(position)}><i />{option}</button>)}
    {picked !== null && <button className="demo-btn" onClick={() => { setIndex(index + 1); setPicked(null); }}>{index === sample.length - 1 ? 'See my score' : 'Next question'}</button>}
  </div>;
}

const starter = [['Study React Hooks', 'Today · 6:30 PM · 45 min', '#3b82f6', true], ['Math homework — Chapter 5', 'Tomorrow · 4:00 PM · 60 min', '#f97316', false], ['Revise SQL joins', 'Fri · 8:00 PM · 30 min', '#10b981', false], ['Group project meeting', 'Sat · 11:00 AM · 90 min', '#ec4899', false]];

export function PlannerDemo() {
  const [done, setDone] = useState(() => starter.map((task) => task[3]));
  const count = done.filter(Boolean).length;
  return <div className="mock-card">
    <div className="mock-tally"><div className="a"><b>{starter.length}</b><small>Total</small></div><div className="b"><b>{count}</b><small>Done</small></div><div className="c"><b>{starter.length - count}</b><small>Pending</small></div></div>
    <div className="mock-quiz-bar planner"><i style={{ width: `${(count / starter.length) * 100}%` }} /></div>
    {starter.map(([title, meta, color], position) => <button className={`mock-task ${done[position] ? 'done' : ''}`} key={title} style={{ '--c': color }} onClick={() => setDone(done.map((value, spot) => spot === position ? !value : value))}><span>{done[position] && <Check size={12} />}</span><div><strong>{title}</strong><small>{meta}</small></div></button>)}
    <p className="demo-caption">{count === starter.length ? 'All done — great work! 🎉' : 'Tap a task to tick it off'}</p>
  </div>;
}

export const demos = { schedule: ScheduleDemo, budget: BudgetDemo, exam: ExamDemo, planner: PlannerDemo };
