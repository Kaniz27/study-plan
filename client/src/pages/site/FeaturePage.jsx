import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react';
import { SiteLink } from '../../components/SiteLink';
import { tools } from '../../data/siteContent';
import { navigate } from '../../router';
import { demos } from './demos';
import { CtaBand } from './SiteLayout';

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: .55, ease: 'easeOut' } };

export default function FeaturePage({ tool }) {
  const Demo = demos[tool.id]; const Icon = tool.icon;
  const others = tools.filter((item) => item.id !== tool.id);
  return <div className={`tone-${tool.tone}`} style={{ '--tone': tool.color, '--tone2': tool.color2 }}>
    <section className="sp-hero">
      <div className="sp-hero-inner">
        <div className="sp-hero-copy">
          <span className="sp-crumbs"><SiteLink to="/">Home</SiteLink><ChevronRight size={14} /><b>{tool.label}</b></span>
          <span className="sp-hero-icon"><Icon size={30} /></span>
          <h1>{tool.title}<span>{tool.accent}</span></h1>
          <p>{tool.lead}</p>
          <ul>{tool.bullets.map((point) => <li key={point}><span><Check size={13} /></span>{point}</li>)}</ul>
          <div className="sp-hero-actions"><button className="lp-cta" onClick={() => navigate('/register')}>{tool.cta} <ArrowRight size={17} /></button><button className="lp-ghost" onClick={() => navigate('/login')}>I already have an account</button></div>
        </div>
        <div className="sp-demo"><span className="demo-badge"><Sparkles size={13} /> Try it live</span><Demo /></div>
      </div>
    </section>

    <section className="sp-section">
      <motion.div className="sp-heading" {...reveal}><span className="sp-eyebrow">WHAT YOU GET</span><h2>Everything {tool.label === 'Exam Q&A' ? 'for exam practice' : `for your ${tool.label.toLowerCase()}`}.</h2></motion.div>
      <div className="sp-cards">{tool.highlights.map(({ icon: Feature, title, text }, index) => <motion.article className="sp-card" key={title} {...reveal} transition={{ ...reveal.transition, delay: (index % 3) * .07 }}><span><Feature size={22} /></span><h3>{title}</h3><p>{text}</p></motion.article>)}</div>
    </section>

    <section className="sp-section">
      <motion.div className="sp-heading" {...reveal}><span className="sp-eyebrow">HOW IT WORKS</span><h2>Three simple steps.</h2></motion.div>
      <div className="sp-steps">{tool.steps.map(([title, text], index) => <motion.div className="sp-step" key={title} {...reveal} transition={{ ...reveal.transition, delay: index * .08 }}><span className="sp-step-num">{index + 1}</span><h3>{title}</h3><p>{text}</p></motion.div>)}</div>
    </section>

    <section className="sp-section">
      <motion.div className="sp-heading" {...reveal}><span className="sp-eyebrow">KEEP EXPLORING</span><h2>More tools inside StudyFlow.</h2></motion.div>
      <div className="sp-more">{others.map(({ path, label, icon: Other, tone, color, color2, summary }) => <SiteLink key={path} to={path} className={`hp-tool compact tone-${tone}`} style={{ '--tone': color, '--tone2': color2 }}><span className="hp-tool-icon"><Other size={22} /></span><h3>{label}</h3><p>{summary}</p><b>Open {label} <ArrowRight size={16} /></b></SiteLink>)}</div>
    </section>

    <CtaBand title={`Ready to try ${tool.label}?`} text="Create your StudyFlow space and start in under a minute." />
  </div>;
}
