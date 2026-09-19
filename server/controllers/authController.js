import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { memoryStore } from '../utils/memoryStore.js';

const isProduction = process.env.NODE_ENV === 'production';
const cookieOptions = { httpOnly: true, sameSite: isProduction ? 'none' : 'lax', secure: isProduction, maxAge: 7 * 24 * 60 * 60 * 1000 };
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, completedDates: user.completedDates, university: user.university || '', bio: user.bio || '', monthlyBudget: user.monthlyBudget || 0, createdAt: user.createdAt });

export async function register(req, res, next) {
  try {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    const { name, email, password } = req.body;
    if (memoryStore.enabled) {
      if (memoryStore.users.some((item) => item.email === email)) return res.status(409).json({ message: 'An account with that email already exists' });
      const user = { _id: `user-${Date.now()}`, name, email, password: await bcrypt.hash(password, 12), completedDates: [], university: '', bio: '', monthlyBudget: 0, createdAt: new Date().toISOString() };
      memoryStore.users.push(user);
      res.cookie('token', jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' }), cookieOptions);
      return res.status(201).json({ user: publicUser(user) });
    }
    if (await User.findOne({ email })) return res.status(409).json({ message: 'An account with that email already exists' });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    res.cookie('token', jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' }), cookieOptions);
    res.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    const user = memoryStore.enabled ? memoryStore.users.find((item) => item.email === req.body.email) : await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ message: 'Email or password is incorrect' });
    res.cookie('token', jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' }), cookieOptions);
    res.json({ user: publicUser(user) });
  } catch (error) { next(error); }
}

export async function updateProfile(req, res, next) {
  try {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ message: errors.array()[0].msg });
    const updates = Object.fromEntries(['name', 'university', 'bio', 'monthlyBudget'].filter((field) => req.body[field] !== undefined).map((field) => [field, req.body[field]]));
    Object.assign(req.user, updates);
    if (!memoryStore.enabled) await req.user.save();
    res.json({ user: publicUser(req.user) });
  } catch (error) { next(error); }
}

export const me =(req, res) => res.json({ user: publicUser(req.user) });
export const logout = (req, res) => { res.clearCookie('token', cookieOptions); res.json({ message: 'Logged out' }); };
