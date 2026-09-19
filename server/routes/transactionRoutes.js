import { Router } from 'express';
import { body } from 'express-validator';
import Transaction from '../models/Transaction.js';
import { makeCrud } from '../controllers/crudController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const crud = makeCrud({ Model: Transaction, collection: 'transactions', fields: ['type', 'category', 'amount', 'date', 'description', 'priority'] });
const transactionFields = [
  body('type').isIn(['Income', 'Expense']).withMessage('Type must be Income or Expense'),
  body('category').trim().notEmpty().withMessage('Please choose a category').isLength({ max: 60 }),
  body('amount').isFloat({ gt: 0, max: 1000000000 }).withMessage('Amount must be greater than 0').toFloat(),
  body('date').isISO8601().withMessage('A valid date is required'),
  body('description').optional().trim().isLength({ max: 200 }).withMessage('Description is too long'),
  body('priority').optional().isIn(['Low', 'Medium', 'High'])
];

const router = Router();
router.use(verifyToken);
router.get('/', crud.list);
router.post('/', transactionFields, crud.create);
router.put('/:id', transactionFields, crud.update);
router.delete('/:id', crud.remove);
export default router;
