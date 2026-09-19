import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Minus, Play, Plus, RotateCcw, Send, Settings, SlidersHorizontal, Timer, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { MAX_QUESTIONS, questionBank, quizCategories, quizDifficulties } from '../data/questions';
import { percentOf } from '../utils';

const shuffle = (list) => { const copy = [...list]; for (let index = copy.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [copy[index], copy[swap]] = [copy[swap], copy[index]]; } return copy; };
const clock = (total) => `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
const poolFor = (categories, difficulty) => questionBank.filter((item) => categories.includes(item.category) && (difficulty === 'All' || item.difficulty === difficulty));

function buildQuiz(categories, difficulty, count) {
  return shuffle(poolFor(categories, difficulty)).slice(0, count).map((item) => {
    const options = shuffle(item.options.map((text, index) => ({ text, correct: index === item.answer })));
    return { ...item, options: options.map((option) => option.text), answer: options.findIndex((option) => option.correct) };
  });
}

export default function QuizGenerator({ attempts, preset }) {
  const [settings, setSettings] = useState({ categories: [], difficulty: 'All', count: 10, timerOn: false, minutes: 10 });
  const [phase, setPhase] = useState('setup'); const [quiz, setQuiz] = useState([]); const [answers, setAnswers] = useState({}); const [current, setCurrent] = useState(0); const [secondsLeft, setSecondsLeft] = useState(0); const [result, setResult] = useState(null);
  const startedAt = useRef(0); const finished = useRef(false);

  const pool = useMemo(() => poolFor(settings.categories, settings.difficulty), [settings.categories, settings.difficulty]);
  const max = pool.length ? Math.min(MAX_QUESTIONS, pool.length) : MAX_QUESTIONS;
  const count = Math.min(settings.count, max);
  const valid = settings.categories.length > 0 && count >= 1 && (!settings.timerOn || settings.minutes >= 1);
  const patch = (changes) => setSettings((current) => ({ ...current, ...changes }));

  useEffect(() => { if (preset) { setSettings((current) => ({ ...current, categories: preset.categories })); setPhase('setup'); } }, [preset]);
  useEffect(() => {
    if (phase !== 'running' || !settings.timerOn) return undefined;
    if (secondsLeft <= 0) { finish(); return undefined; }
    const id = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft]);

  function start() {
    if (!valid) return;
    setQuiz(buildQuiz(settings.categories, settings.difficulty, count)); setAnswers({}); setCurrent(0); setResult(null); setSecondsLeft(settings.minutes * 60);
    startedAt.current = Date.now(); finished.current = false; setPhase('running');
  }
  async function finish() {
    if (finished.current) return; finished.current = true;
    const correct = quiz.filter((item, index) => answers[index] === item.answer).length;
    const breakdown = [...new Set(quiz.map((item) => item.category))].map((category) => { const items = quiz.map((item, index) => ({ item, index })).filter(({ item }) => item.category === category); return { category, total: items.length, correct: items.filter(({ item, index }) => answers[index] === item.answer).length }; });
    const durationSeconds = Math.round((Date.now() - startedAt.current) / 1000);
    setResult({ correct, total: quiz.length, durationSeconds }); setPhase('result');
    if (percentOf(correct, quiz.length) >= 80) confetti({ particleCount: 90, spread: 70, origin: { y: .65 } });
    try { await attempts.save({ categories: breakdown.map((row) => row.category), difficulty: settings.difficulty, total: quiz.length, correct, durationSeconds, breakdown, date: new Date().toISOString() }); toast.success('Result saved to your progress'); } catch { toast.error('Could not save your result'); }
  }
  const leave = () => { if (phase === 'running' && !window.confirm('Leave this quiz? Your answers will be lost.')) return; setPhase('setup'); };

  if (phase === 'setup') return <div className="quiz-setup">
    <p className="eyebrow quiz-eyebrow"><SlidersHorizontal size={13} /> SETUP</p>
    <h2 className="gradient-text">Customize Your Quiz</h2>
    <div className="setup-grid">
      <div className="setup-box"><h4>Category</h4><div className="chip-row">{quizCategories.map((name) => <button key={name} className={`chip ${settings.categories.includes(name) ? 'on' : ''}`} onClick={() => patch({ categories: settings.categories.includes(name) ? settings.categories.filter((item) => item !== name) : [...settings.categories, name] })}>{name}</button>)}</div></div>
      <div className="setup-box"><h4>Difficulty</h4><div className="chip-row">{quizDifficulties.map((name) => <button key={name} className={`chip ${settings.difficulty === name ? 'on' : ''}`} onClick={() => patch({ difficulty: name })}>{name}</button>)}</div></div>
      <div className="setup-box"><h4>Number of Questions</h4><div className="stepper"><button aria-label="Fewer questions" onClick={() => patch({ count: Math.max(1, count - 1) })}><Minus size={16} /></button><input type="number" min="1" max={max} value={count} onChange={(event) => patch({ count: Math.max(1, Math.min(max, Number(event.target.value) || 1)) })} /><button aria-label="More questions" onClick={() => patch({ count: Math.min(max, count + 1) })}><Plus size={16} /></button></div><input className="fx-range" type="range" min="1" max={max} value={count} onChange={(event) => patch({ count: Number(event.target.value) })} /><small className="muted">Choose 1 to {max} questions{settings.categories.length ? ` (${pool.length} available)` : ''}</small></div>
      <div className="setup-box"><h4>Timer (minutes)</h4><div className="stepper"><button role="switch" aria-checked={settings.timerOn} aria-label="Enable timer" className={`switch ${settings.timerOn ? 'on' : ''}`} onClick={() => patch({ timerOn: !settings.timerOn })}><i /></button><button disabled={!settings.timerOn} aria-label="Less time" onClick={() => patch({ minutes: Math.max(1, settings.minutes - 1) })}><Minus size={16} /></button><input type="number" min="1" max="120" disabled={!settings.timerOn} value={settings.minutes} onChange={(event) => patch({ minutes: Math.max(1, Math.min(120, Number(event.target.value) || 1)) })} /><button disabled={!settings.timerOn} aria-label="More time" onClick={() => patch({ minutes: Math.min(120, settings.minutes + 1) })}><Plus size={16} /></button></div><small className="muted">{settings.timerOn ? 'The quiz submits itself when time runs out.' : 'Switch on to race against the clock.'}</small></div>
    </div>
    <button className="start-quiz" disabled={!valid} onClick={start}><Play size={18} /> Start Quiz</button>
    {!valid && <p className="quiz-error"><AlertCircle size={14} /> Please select a category and valid question count and timer duration.</p>}
  </div>;

  if (phase === 'result') {
    const pct = percentOf(result.correct, result.total);
    return <div className="quiz-result">
      <div className="score-ring" style={{ '--pct': pct }}><div><strong>{pct}%</strong><small>{result.correct} / {result.total}</small></div></div>
      <h2 className="gradient-text">{pct >= 80 ? 'Outstanding work!' : pct >= 50 ? 'Nice progress!' : 'Keep practicing!'}</h2>
      <p className="muted">You answered {result.correct} of {result.total} correctly in {clock(result.durationSeconds)}.</p>
      <div className="quiz-actions"><button className="fx-btn brand" onClick={start}><RotateCcw size={16} /> Try again</button><button className="fx-btn muted" onClick={() => setPhase('setup')}><Settings size={16} /> Change settings</button></div>
      <div className="review-list">{quiz.map((item, index) => { const ok = answers[index] === item.answer; return <div className={`review-item ${ok ? 'ok' : 'bad'}`} key={item.id}>{ok ? <CheckCircle2 size={20} /> : <XCircle size={20} />}<div><strong>{index + 1}. {item.q}</strong><small>{answers[index] === undefined ? 'Not answered' : `Your answer: ${item.options[answers[index]]}`}</small>{!ok && <small className="right-answer">Correct answer: {item.options[item.answer]}</small>}</div></div>; })}</div>
    </div>;
  }

  const item = quiz[current]; const answered = Object.keys(answers).length; const last = current === quiz.length - 1;
  return <div className="quiz-run">
    <div className="quiz-run-top"><button className="fx-btn muted small" onClick={leave}><Settings size={16} /> Change Settings</button>{settings.timerOn && <span className={`timer-chip ${secondsLeft <= 60 ? 'urgent' : ''}`}><Timer size={15} /> {clock(secondsLeft)}</span>}</div>
    <div className="quiz-progress-label"><span>Question {current + 1} of {quiz.length}</span><b>{percentOf(current + 1, quiz.length)}% Complete</b></div>
    <div className="quiz-bar"><div style={{ width: `${percentOf(current + 1, quiz.length)}%` }} /></div>
    <div className="question-card">
      <div className="question-tags"><span className="tag blue">Q{current + 1}</span><span className="tag">{item.category}</span><span className={`tag diff-${item.difficulty.toLowerCase()}`}>{item.difficulty}</span></div>
      <h3>{item.q}</h3>
      <div className="option-list" role="radiogroup">{item.options.map((option, index) => <label className={`fx-option ${answers[current] === index ? 'selected' : ''}`} key={option}><input type="radio" name={`q-${current}`} checked={answers[current] === index} onChange={() => setAnswers({ ...answers, [current]: index })} /><span className="dot" />{option}</label>)}</div>
    </div>
    <div className="quiz-nav"><button className="fx-btn muted" disabled={current === 0} onClick={() => setCurrent(current - 1)}><ArrowLeft size={16} /> Previous</button><span className="muted">{answered} of {quiz.length} answered</span>{last ? <button className="fx-btn brand" onClick={() => { if (answered < quiz.length && !window.confirm(`${quiz.length - answered} question(s) unanswered. Submit anyway?`)) return; finish(); }}><Send size={16} /> Submit Quiz</button> : <button className="fx-btn brand" onClick={() => setCurrent(current + 1)}>Next <ArrowRight size={16} /></button>}</div>
    <div className="dot-nav">{quiz.map((entry, index) => <button key={entry.id} aria-label={`Go to question ${index + 1}`} className={`${index === current ? 'now' : ''} ${answers[index] !== undefined ? 'done' : ''}`} onClick={() => setCurrent(index)}>{index + 1}</button>)}</div>
  </div>;
}
