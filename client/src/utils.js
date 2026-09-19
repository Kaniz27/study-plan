const pad = (value) => String(value).padStart(2, '0');
const palette = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#059669', '#0891b2', '#ca8a04'];

export const todayKey = () => { const now = new Date(); return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`; };
export const dateKey = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '');
export const formatDay = (key, options = { month: 'short', day: 'numeric', year: 'numeric' }) => { if (!key) return ''; const [year, month, day] = key.split('-').map(Number); return new Date(year, month - 1, day).toLocaleDateString('en-US', options); };
export const formatTime = (value) => { if (!value) return ''; const [hours, minutes] = value.split(':').map(Number); return `${hours % 12 || 12}:${pad(minutes)} ${hours < 12 ? 'AM' : 'PM'}`; };
export const money = (value) => `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const initials = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('') || '?';
export const accentFor = (text = '') => palette[[...text].reduce((sum, char) => sum + char.charCodeAt(0), 0) % palette.length];
export const percentOf = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);
