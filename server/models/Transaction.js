import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  category: { type: String, required: true, trim: true, maxlength: 60 },
  amount: { type: Number, required: true, min: 0.01 },
  date: { type: Date, required: true },
  description: { type: String, trim: true, maxlength: 200, default: '' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' }
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
