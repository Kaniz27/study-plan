import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, logout, me, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();
const email = body('email').isEmail().withMessage('Enter a valid email');
router.post('/register', [body('name').trim().notEmpty().withMessage('Name is required'), email, body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')], register);
router.post('/login', [email, body('password').notEmpty().withMessage('Password is required')], login);
router.post('/logout', logout);
router.get('/me', verifyToken, me);
router.put('/profile', verifyToken, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty').isLength({ max: 80 }),
  body('university').optional().trim().isLength({ max: 100 }).withMessage('University name is too long'),
  body('bio').optional().trim().isLength({ max: 300 }).withMessage('Bio must be 300 characters or fewer'),
  body('monthlyBudget').optional().isFloat({ min: 0, max: 1000000000 }).withMessage('Budget must be zero or more').toFloat()
], updateProfile);
export default router;
