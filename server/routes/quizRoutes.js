import { Router } from 'express';
import { body } from 'express-validator';
import QuizAttempt from '../models/QuizAttempt.js';
import { makeCrud } from '../controllers/crudController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const crud = makeCrud({ Model: QuizAttempt, collection: 'quizAttempts', fields: ['categories', 'difficulty', 'total', 'correct', 'durationSeconds', 'breakdown', 'date'] });
const attemptFields = [
  body('categories').isArray({ min: 1, max: 10 }).withMessage('Pick at least one category'),
  body('categories.*').isString().isLength({ max: 40 }),
  body('difficulty').optional().isIn(['All', 'Easy', 'Medium', 'High']),
  body('total').isInt({ min: 1, max: 100 }).withMessage('Invalid question count'),
  body('correct').isInt({ min: 0, max: 100 }).custom((value, { req }) => Number(value) <= Number(req.body.total)).withMessage('Score cannot exceed total'),
  body('durationSeconds').optional().isInt({ min: 0, max: 86400 }),
  body('breakdown').optional().isArray({ max: 10 }),
  body('breakdown.*.category').isString().isLength({ max: 40 }),
  body('breakdown.*.correct').isInt({ min: 0, max: 100 }),
  body('breakdown.*.total').isInt({ min: 1, max: 100 })
];

const router = Router();
router.use(verifyToken);
router.get('/', crud.list);
router.post('/', attemptFields, crud.create);
router.delete('/:id', crud.remove);
export default router;
