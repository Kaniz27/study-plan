import { Router } from 'express';
import { body } from 'express-validator';
import Schedule from '../models/Schedule.js';
import { makeCrud } from '../controllers/crudController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const crud = makeCrud({ Model: Schedule, collection: 'schedules', fields: ['subject', 'instructor', 'description', 'location', 'date', 'startTime', 'endTime'] });
const time = (field) => body(field).optional({ values: 'falsy' }).matches(/^([01]\d|2[0-3]):[0-5]\d$/).withMessage('Time must look like 09:30');
const scheduleFields = [
  body('subject').trim().notEmpty().withMessage('Subject is required').isLength({ max: 100 }),
  body('date').isISO8601().withMessage('A valid date is required'),
  body('instructor').optional().trim().isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 500 }),
  body('location').optional().trim().isLength({ max: 100 }),
  time('startTime'),
  time('endTime')
];

const router = Router();
router.use(verifyToken);
router.get('/', crud.list);
router.post('/', scheduleFields, crud.create);
router.put('/:id', scheduleFields, crud.update);
router.delete('/:id', crud.remove);
export default router;
