import Task from '../models/Task.js';
import { memoryStore } from '../utils/memoryStore.js';

export async function listTasks(req, res, next) {
  try {
    if (memoryStore.enabled) {
      const tasks = memoryStore.tasks.filter((task) => task.userId === req.user._id && (!req.query.subject || req.query.subject === 'All' || task.subject === req.query.subject) && (!req.query.date || (task.dueDate && new Date(task.dueDate).toISOString().slice(0, 10) === req.query.date)));
      return res.json({ tasks });
    }
    const filter = { userId: req.user._id };
    if (req.query.subject && req.query.subject !== 'All') filter.subject = req.query.subject;
    if (req.query.date) { const start = new Date(`${req.query.date}T00:00:00.000Z`); const end = new Date(start); end.setUTCDate(end.getUTCDate() + 1); filter.dueDate = { $gte: start, $lt: end }; }
    res.json({ tasks: await Task.find(filter).sort({ isCompleted: 1, dueDate: 1, createdAt: -1 }) });
  } catch (error) { next(error); }
}

export async function createTask(req, res, next) {
  try {
    if (memoryStore.enabled) { const task = { ...req.body, _id: `task-${Date.now()}`, userId: req.user._id, isCompleted: false, createdAt: new Date().toISOString() }; memoryStore.tasks.unshift(task); return res.status(201).json({ task }); }
    res.status(201).json({ task: await Task.create({ ...req.body, userId: req.user._id }) });
  } catch (error) { next(error); }
}
export async function updateTask(req, res, next) {
  try { if (memoryStore.enabled) { const task = memoryStore.tasks.find((item) => item._id === req.params.id && item.userId === req.user._id); if (!task) return res.status(404).json({ message: 'Task not found' }); Object.assign(task, req.body); return res.json({ task }); } const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true, runValidators: true }); if (!task) return res.status(404).json({ message: 'Task not found' }); res.json({ task }); } catch (error) { next(error); }
}
export async function toggleTask(req, res, next) {
  try { if (memoryStore.enabled) { const task = memoryStore.tasks.find((item) => item._id === req.params.id && item.userId === req.user._id); if (!task) return res.status(404).json({ message: 'Task not found' }); task.isCompleted = !task.isCompleted; return res.json({ task }); } const task = await Task.findOne({ _id: req.params.id, userId: req.user._id }); if (!task) return res.status(404).json({ message: 'Task not found' }); task.isCompleted = !task.isCompleted; await task.save(); res.json({ task }); } catch (error) { next(error); }
}
export async function deleteTask(req, res, next) {
  try { if (memoryStore.enabled) { memoryStore.tasks = memoryStore.tasks.filter((task) => !(task._id === req.params.id && task.userId === req.user._id)); return res.json({ message: 'Task deleted' }); } await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); res.json({ message: 'Task deleted' }); } catch (error) { next(error); }
}
