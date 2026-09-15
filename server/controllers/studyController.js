import StudySession from '../models/StudySession.js';
import Task from '../models/Task.js';
import Badge from '../models/Badge.js';
import { memoryStore } from '../utils/memoryStore.js';

function dayKey(date) { return new Date(date).toISOString().slice(0, 10); }

export async function logSession(req, res, next) {
  try {
    const durationMinutes = Number(req.body.durationMinutes);
    if (!Number.isInteger(durationMinutes) || durationMinutes < 1 || durationMinutes > 240) return res.status(400).json({ message: 'Duration must be between 1 and 240 minutes' });
    if (memoryStore.enabled) {
      const session = { _id: `session-${Date.now()}`, userId: req.user._id, durationMinutes, date: req.body.date || new Date().toISOString(), createdAt: new Date().toISOString() };
      memoryStore.sessions.push(session);
      return res.status(201).json({ session });
    }
    res.status(201).json({ session: await StudySession.create({ userId: req.user._id, durationMinutes, date: req.body.date || new Date() }) });
  } catch (error) { next(error); }
}

export async function weeklySessions(req, res, next) {
  try {
    const since = new Date(); since.setUTCHours(0, 0, 0, 0); since.setUTCDate(since.getUTCDate() - 6);
    let sessions = memoryStore.enabled ? memoryStore.sessions.filter((item) => item.userId === req.user._id && new Date(item.date) >= since) : await StudySession.find({ userId: req.user._id, date: { $gte: since } });
    const days = Array.from({ length: 7 }, (_, index) => { const date = new Date(since); date.setUTCDate(since.getUTCDate() + index); return { date: dayKey(date), label: date.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }), minutes: 0 }; });
    sessions.forEach((session) => { const target = days.find((day) => day.date === dayKey(session.date)); if (target) target.minutes += session.durationMinutes; });
    res.json({ days });
  } catch (error) { next(error); }
}

export async function listBadges(req, res, next) {
  try {
    if (memoryStore.enabled) {
      const tasks = memoryStore.tasks.filter((task) => task.userId === req.user._id);
      const unlocked = [];
      if (tasks.length) unlocked.push('First Task');
      if (tasks.some((task) => task.isCompleted)) unlocked.push('First Task Done');
      if (tasks.filter((task) => task.isCompleted).length >= 5) unlocked.push('5 Tasks Completed');
      return res.json({ badges: unlocked.map((badgeType) => ({ badgeType, unlockedAt: new Date().toISOString() })) });
    }
    const badges = await Badge.find({ userId: req.user._id }).sort({ unlockedAt: -1 }); res.json({ badges });
  } catch (error) { next(error); }
}