import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { memoryStore } from '../utils/memoryStore.js';

export async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Please log in to continue' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    req.user = memoryStore.enabled ? memoryStore.users.find((user) => user._id === decoded.id) : await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ message: 'Session expired' });
    next();
  } catch { res.status(401).json({ message: 'Invalid or expired session' }); }
}
