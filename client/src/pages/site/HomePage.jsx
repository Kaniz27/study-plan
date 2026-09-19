import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Check, Flame, GraduationCap, Rocket, Target, Wallet, Zap } from 'lucide-react';
import { SiteLink } from '../../components/SiteLink';
import { tools } from '../../data/siteContent';
import { navigate } from '../../router';
import { CtaBand } from './SiteLayout';

const bob = (delay = 0) => ({ animate: { y: [0, -9, 0] }, transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay } });
const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: .55, ease: 'easeOut' } };
const journey = [['Create your space', 'Sign up in under a minute and land on your personal dashboard.', GraduationCap, '#6366f1'], ['Add your plans', 'Drop in classes, expenses, tasks and quizzes — each has its own page.', Rocket, '#ec4899'], ['Watch progress grow', 'Your overview, charts and profile keep your momentum visible.', Target, '#10b981']];

export default function HomePage() {
  return <>
    <section className="lp-hero">
      <div className="lp-blob one" /><div className="lp-blob two" /><div className="lp-blob three" />
      <div className="lp-hero-copy">
        <motion.span className="lp-chip" {...reveal}><Zap size={14} /> Your all-in-one student workspace</motion.span>
        <motion.h1 {...reveal}>Turn scattered effort into <span className="lp-gradient">steady progress.</span></motion.h1>
        <motion.p {...reveal}>Plan your classes, track every dollar, practise for exams and organise daily tasks — all in one colourful workspace built for students.</motion.p>
        <motion.div className="lp-hero-actions" {...reveal}><button className="lp-primary" onClick={() => navigate('/register')}>Create your study space <ArrowRight size={18} /></button><button className="lp-ghost" onClick={() => navigate('/login')}>I already have an account</button></motion.div>
        <motion.div className="lp-tools" {...reveal}>{tools.map(({ path, label, icon: Icon, color }) => <SiteLink key={path} to={path} style={{ '--tone': color }}><Icon size={16} /> {label}</SiteLink>)}</motion.div>
      </div>
      <div className="lp-hero-visual">
        <div className="lp-window">
          <div className="lp-window-top"><span /><span /><span /></div>
          <div className="lp-window-body">
            <div className="lp-window-side">{tools.map(({ id, icon: Icon, color }) => <i key={id} style={{ background: color }}><Icon size={14} /></i>)}</div>
            <div className="lp-window-main">
              <small>YOUR OVERVIEW</small><h3>Good morning, Alex.</h3>
              <div className="lp-window-stats"><b>12<small>tasks</small></b><b>68%<small>complete</small></b><b>$442<small>left</small></b></div>
              <div className="lp-window-chart"><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="lp-window-task"><span><Check size={11} /></span><div><b>Review database normalization</b><small>Database · Today</small></div></div>
            </div>
          </div>
        </div>
        <motion.div className="lp-float f1" {...bob()}><span style={{ background: '#2563eb' }}><CalendarDays size={16} /></span><div><b>Database Systems</b><small>Today · 10:00 AM</small></div></motion.div>
        <motion.div className="lp-float f2" {...bob(.8)}><span style={{ background: '#059669' }}><Wallet size={16} /></span><div><b>Within budget</b><small>$442 left this month</small></div></motion.div>
        <motion.div className="lp-float f3" {...bob(1.6)}><span style={{ background: '#7c3aed' }}><Target size={16} /></span><div><b>Quiz score 9/10</b><small>JavaScript · Medium</small></div></motion.div>
        <motion.div className="lp-float f4" {...bob(2.2)}><span style={{ background: '#f97316' }}><Flame size={16} /></span><div><b>7 day streak</b><small>Consistency wins</small></div></motion.div>
      </div>
    </section>

    <section className="sp-section">
      <motion.div className="sp-heading" {...reveal}><span className="sp-eyebrow">FOUR TOOLS, ONE WORKSPACE</span><h2>Pick a tool and take a look.</h2><p>Each part of StudyFlow has its own page. Open one to see what it does and try it out.</p></motion.div>
      <div className="hp-tools">{tools.map(({ path, label, icon: Icon, tone, color, color2, summary, bullets }, index) => <motion.div key={path} {...reveal} transition={{ ...reveal.transition, delay: index * .07 }}><SiteLink to={path} className={`hp-tool tone-${tone}`} style={{ '--tone': color, '--tone2': color2 }}>
        <span className="hp-tool-icon"><Icon size={26} /></span><h3>{label}</h3><p>{summary}</p>
        <ul>{bullets.slice(0, 2).map((point) => <li key={point}><Check size={14} /> {point}</li>)}</ul>
        <b>Explore {label} <ArrowRight size={16} /></b>
      </SiteLink></motion.div>)}</div>
    </section>

    <section className="sp-section">
      <motion.div className="sp-heading" {...reveal}><span className="sp-eyebrow">HOW IT WORKS</span><h2>From sign-up to steady progress.</h2></motion.div>
      <div className="sp-steps">{journey.map(([title, text, Icon, color], index) => <motion.div className="sp-step plain" key={title} style={{ '--tone': color }} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}><span className="sp-step-num"><Icon size={20} /></span><small>Step {index + 1}</small><h3>{title}</h3><p>{text}</p></motion.div>)}</div>
    </section>

    <section className="hp-band"><div><b>4</b><span>study tools</span></div><div><b>60</b><span>practice questions</span></div><div><b>1</b><span>dashboard for everything</span></div></section>
    <CtaBand />
  </>;
}
