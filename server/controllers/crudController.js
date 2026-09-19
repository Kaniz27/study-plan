import { validationResult } from 'express-validator';
import { memoryStore } from '../utils/memoryStore.js';

const pick = (body, fields) => Object.fromEntries(fields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]));
const normalize = (data) => (data.date ? { ...data, date: new Date(data.date).toISOString() } : data);
const invalid = (req, res) => { const errors = validationResult(req); if (errors.isEmpty()) return false; res.status(400).json({ message: errors.array()[0].msg }); return true; };

export function makeCrud({ Model, collection, fields, sortField = 'date' }) {
  const items = (req) => memoryStore[collection].filter((item) => item.userId === req.user._id);
  return {
    async list(req, res, next) {
      try {
        if (memoryStore.enabled) return res.json({ items: items(req).sort((a, b) => String(b[sortField]).localeCompare(String(a[sortField]))) });
        res.json({ items: await Model.find({ userId: req.user._id }).sort({ [sortField]: -1, createdAt: -1 }) });
      } catch (error) { next(error); }
    },
    async create(req, res, next) {
      try {
        if (invalid(req, res)) return;
        const data = normalize(pick(req.body, fields));
        if (memoryStore.enabled) { const item = { ...data, _id: `${collection}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, userId: req.user._id, createdAt: new Date().toISOString() }; memoryStore[collection].unshift(item); return res.status(201).json({ item }); }
        res.status(201).json({ item: await Model.create({ ...data, userId: req.user._id }) });
      } catch (error) { next(error); }
    },
    async update(req, res, next) {
      try {
        if (invalid(req, res)) return;
        const data = normalize(pick(req.body, fields));
        if (memoryStore.enabled) { const item = items(req).find((entry) => entry._id === req.params.id); if (!item) return res.status(404).json({ message: 'Item not found' }); Object.assign(item, data); return res.json({ item }); }
        const item = await Model.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, data, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json({ item });
      } catch (error) { next(error); }
    },
    async remove(req, res, next) {
      try {
        if (memoryStore.enabled) { memoryStore[collection] = memoryStore[collection].filter((item) => !(item._id === req.params.id && item.userId === req.user._id)); return res.json({ message: 'Deleted' }); }
        await Model.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.json({ message: 'Deleted' });
      } catch (error) { next(error); }
    }
  };
}
