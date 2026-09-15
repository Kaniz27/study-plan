import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, me } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();
const email = body('email').isEmail().withMessage('Enter a valid email');
router.post('/register', [body('name').trim().notEmpty().withMessage('Name is required'), email, body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')], register);
router.post('/login', [email, body('password').notEmpty().withMessage('Password is required')], login);
router.post('/logout', logout);
router.get('/me', verifyToken, me);
export default router;
