import { Router } from 'express';
import { body } from 'express-validator';
import { listTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/taskController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();
const taskFields = [body('title').trim().notEmpty().withMessage('Title is required'), body('subject').isIn(['Programming', 'Mathematics', 'English', 'Networking', 'Database', 'Others']), body('priority').optional().isIn(['Low', 'Medium', 'High'])];
router.use(verifyToken);
router.get('/', listTasks);
router.post('/', taskFields, createTask);
router.put('/:id', taskFields, updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);
export default router;
