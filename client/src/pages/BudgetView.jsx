import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CheckSquare, CircleDollarSign, FileText, Info, PieChart as PieIcon, Plus, Save, Tag, Trash2, Pencil, TrendingDown, TrendingUp, Wallet, X, AlertTriangle, Calendar, Search } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import toast from 'react-hot-toast';
import { EmptyState, PageHeader } from '../components/ui';
import { accentFor, dateKey, formatDay, money, percentOf, todayKey } from '../utils';

export const categoriesByType = {
  Expense: ['Food', 'Transport', 'Books & Supplies', 'Tuition & Fees', 'Rent & Utilities', 'Entertainment', 'Health', 'Shopping', 'Other'],
  Income: ['Allowance', 'Salary', 'Scholarship', 'Freelance', 'Gift', 'Other']
};
const blank = () => ({ type: 'Expense', category: '', amount: '', date: todayKey(), description: '', priority: 'Medium' });

export default function BudgetView({ transactions, user, updateProfile }) {
  const [form, setForm] = useState(blank()); const [editingId, setEditingId] = useState(null); const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('All'); const [query, setQuery] = useState(''); const [limit, setLimit] = useState(user.monthlyBudget || '');
  const month = todayKey().slice(0, 7);
  const thisMonth = useMemo(() => transactions.items.filter((item) => dateKey(item.date).startsWith(month)), [transactions.items, month]);
  const income = thisMonth.filter((item) => item.type === 'Income').reduce((sum, item) => sum + item.amount, 0);
  const expenses = thisMonth.filter((item) => item.type === 'Expense').reduce((sum, item) => sum + item.amount, 0);
  const byCategory = useMemo(() => {
    const totals = {}; thisMonth.filter((item) => item.type === 'Expense').forEach((item) => { totals[item.category] = (totals[item.category] || 0) + item.amount; });
    return Object.entries(totals).map(([name, total]) => ({ name, total })).sort((a, b) => b.total - a.total);
  }, [thisMonth]);
  const history = useMemo(() => transactions.items.filter((item) => (filter === 'All' || item.type === filter) && (!query.trim() || `${item.category} ${item.description}`.toLowerCase().includes(query.trim().toLowerCase()))).sort((a, b) => dateKey(b.date).localeCompare(dateKey(a.date))), [transactions.items, filter, query]);

  const budget = user.monthlyBudget > 0 ? user.monthlyBudget : income;
  const status = !thisMonth.length && !user.monthlyBudget ? { tone: 'idle', text: 'Add a transaction to see your budget status' }
    : expenses <= budget ? { tone: 'good', text: 'You are within budget', detail: `${money(budget - expenses)} left of ${money(budget)}${user.monthlyBudget > 0 ? ' monthly limit' : ' income'}` }
      : { tone: 'bad', text: 'You are over budget', detail: `${money(expenses - budget)} above your ${user.monthlyBudget > 0 ? 'monthly limit' : 'income'}` };
  const chart = [{ name: 'Income', value: income, color: '#10b981' }, { name: 'Expenses', value: expenses, color: '#f43f5e' }].filter((slice) => slice.value > 0);
  const set = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const reset = () => { setForm(blank()); setEditingId(null); };

  async function submit(event) {
    event.preventDefault();
    if (!form.category) return toast.error('Please choose a category');
    if (!(Number(form.amount) > 0)) return toast.error('Enter an amount greater than 0');
    setBusy(true);
    try { await transactions.save({ ...form, amount: Number(form.amount) }, editingId); toast.success(editingId ? 'Transaction updated' : 'Transaction added'); reset(); } catch (error) { toast.error(error.response?.data?.message || 'Could not save transaction'); } finally { setBusy(false); }
  }
  async function remove(item) {
    if (!window.confirm(`Delete this ${item.type.toLowerCase()} of ${money(item.amount)}?`)) return;
    try { await transactions.remove(item._id); if (editingId === item._id) reset(); toast.success('Transaction deleted'); } catch { toast.error('Could not delete transaction'); }
  }
  async function saveLimit() {
    const value = Number(limit || 0);
    if (!(value >= 0)) return toast.error('Budget must be zero or more');
    try { await updateProfile({ monthlyBudget: value }); toast.success(value ? 'Monthly budget saved' : 'Monthly budget cleared'); } catch (error) { toast.error(error.response?.data?.message || 'Could not save budget'); }
  }

  return <div className="fx-page theme-budget">
    <PageHeader icon={CircleDollarSign} title="Spending Insights" subtitle="Track and manage your expenses effectively" />
    <div className="budget-grid">
      <section className="fx-card">
        <h2 className="fx-card-title"><Plus size={18} /> {editingId ? 'Edit Transaction' : 'Add New Transaction'}</h2>
        <form className="fx-form" onSubmit={submit}>
          <label><span className="fx-label"><TrendingUp size={14} /> Transaction Type</span><select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value, category: '' })}><option>Expense</option><option>Income</option></select></label>
          <label><span className="fx-label"><Tag size={14} /> Category</span><select value={form.category} onChange={set('category')}><option value="">Select a category</option>{categoriesByType[form.type].map((name) => <option key={name}>{name}</option>)}</select></label>
          <label><span className="fx-label"><CircleDollarSign size={14} /> Amount</span><input type="number" min="0" step="0.01" value={form.amount} onChange={set('amount')} placeholder="0.00" /></label>
          <label><span className="fx-label"><Calendar size={14} /> Date</span><input type="date" required value={form.date} onChange={set('date')} /></label>
          <label><span className="fx-label"><FileText size={14} /> Description</span><input maxLength="200" value={form.description} onChange={set('description')} placeholder="Brief description of the transaction" /></label>
          <label><span className="fx-label">Priority</span><select value={form.priority} onChange={set('priority')}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <div className="fx-form-actions"><button className="fx-btn brand block" disabled={busy}>{editingId ? <Save size={17} /> : <Plus size={17} />} {busy ? 'Saving...' : editingId ? 'Save Changes' : 'Add Transaction'}</button>{editingId && <button type="button" className="fx-btn muted" onClick={reset}><X size={17} /> Cancel</button>}</div>
        </form>
      </section>
      <section className="fx-card">
        <div className="fx-card-head"><h2 className="fx-card-title"><PieIcon size={18} /> This Month Overview</h2><span className="fx-hint"><Info size={14} /> Monthly Summary</span></div>
        <div className="budget-chart">{chart.length ? <ResponsiveContainer width="100%" height={210}><PieChart><Pie data={chart} dataKey="value" innerRadius={62} outerRadius={92} paddingAngle={chart.length > 1 ? 4 : 0} stroke="none">{chart.map((slice) => <Cell key={slice.name} fill={slice.color} />)}</Pie><Tooltip formatter={(value) => money(value)} /></PieChart></ResponsiveContainer> : <EmptyState compact text="No income or expenses recorded this month yet." />}</div>
        <div className="budget-legend"><span><i style={{ background: '#10b981' }} /> Income</span><span><i style={{ background: '#f43f5e' }} /> Expenses</span></div>
        <div className="budget-totals"><div className="in"><ArrowUpRight size={18} /><small>Income</small><strong>{money(income)}</strong></div><div className="out"><ArrowDownRight size={18} /><small>Expenses</small><strong>{money(expenses)}</strong></div><div className="net"><Wallet size={18} /><small>Balance</small><strong>{money(income - expenses)}</strong></div></div>
        <div className={`budget-status ${status.tone}`}>{status.tone === 'bad' ? <AlertTriangle size={18} /> : <CheckSquare size={18} />}<div><b>{status.text}</b>{status.detail && <small>{status.detail}</small>}</div></div>
        {user.monthlyBudget > 0 && <div className="progress-track budget-track"><div style={{ width: `${Math.min(100, percentOf(expenses, user.monthlyBudget))}%`, background: expenses > user.monthlyBudget ? '#f43f5e' : '#10b981' }} /></div>}
        <div className="budget-limit"><label>Monthly budget limit<input type="number" min="0" step="1" value={limit} onChange={(event) => setLimit(event.target.value)} placeholder="e.g., 600" /></label><button className="fx-btn dark" onClick={saveLimit}><Save size={16} /> Save</button></div>
      </section>
    </div>
    {byCategory.length > 0 && <section className="fx-card"><h2 className="fx-card-title"><TrendingDown size={18} /> Spending by category</h2><div className="category-bars">{byCategory.map((row) => <div key={row.name}><div className="category-row"><span>{row.name}</span><b>{money(row.total)}</b></div><div className="progress-track"><div style={{ width: `${percentOf(row.total, expenses)}%`, background: accentFor(row.name) }} /></div></div>)}</div></section>}
    <section className="fx-card">
      <div className="fx-card-head"><h2 className="fx-card-title"><FileText size={18} /> Transaction history</h2><div className="history-tools"><span className="fx-input-icon small"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search..." /></span><div className="fx-segment">{['All', 'Income', 'Expense'].map((name) => <button key={name} className={filter === name ? 'on' : ''} onClick={() => setFilter(name)}>{name}</button>)}</div></div></div>
      {history.length ? <div className="txn-list">{history.map((item) => <div className={`txn-row ${item.type.toLowerCase()}`} key={item._id}><span className="txn-icon">{item.type === 'Income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}</span><div className="txn-info"><strong>{item.category}</strong><small>{item.description || 'No description'} · {formatDay(dateKey(item.date))}</small></div><span className={`priority ${item.priority.toLowerCase()}`}>{item.priority}</span><b className="txn-amount">{item.type === 'Income' ? '+' : '−'}{money(item.amount)}</b><div className="row-actions"><button className="icon-button" title="Edit" onClick={() => { setEditingId(item._id); setForm({ type: item.type, category: item.category, amount: item.amount, date: dateKey(item.date), description: item.description || '', priority: item.priority }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Pencil size={16} /></button><button className="icon-button danger" title="Delete" onClick={() => remove(item)}><Trash2 size={16} /></button></div></div>)}</div> : <EmptyState compact text={transactions.items.length ? 'No transactions match your filters.' : 'No transactions yet. Add your first one above.'} />}
    </section>
  </div>;
}
