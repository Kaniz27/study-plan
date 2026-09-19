import { Router } from 'express';
import { body } from 'express-validator';
import { listTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();
const taskFields = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('subject').optional().isIn(['Programming', 'Mathematics', 'English', 'Networking', 'Database', 'Web Development', 'Others']),
  body('priority').optional().isIn(['Low', 'Medium', 'High']),
  body('dueDate').optional({ values: 'falsy' }).isISO8601().withMessage('A valid date is required'),
  body('startTime').optional({ values: 'falsy' }).matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('Time must look like 09:30'),
  body('duration').optional({ values: 'falsy' }).isInt({ min: 1, max: 1440 }).withMessage('Duration must be 1-1440 minutes').toInt(),
  body('color').optional().matches(/^#[0-9a-fA-F]{6}$/).withMessage('Pick a valid color'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes are too long')
];
router.use(verifyToken);
router.get('/', listTasks);
router.post('/', taskFields, createTask);
router.put('/:id', taskFields, updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);
export default router;
