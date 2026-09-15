import { Router } from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/authMiddleware.js';
import { logSession, weeklySessions, listBadges } from '../controllers/studyController.js';

const router = Router();
router.use(verifyToken);
router.post('/study-sessions', body('durationMinutes').isInt({ min: 1, max: 240 }), logSession);
router.get('/study-sessions/weekly', weeklySessions);
router.get('/badges', listBadges);
export default router;