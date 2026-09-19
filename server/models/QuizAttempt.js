import mongoose from 'mongoose';

const breakdownSchema = new mongoose.Schema({
  category: { type: String, required: true },
  correct: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 1 }
}, { _id: false });

const quizAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  categories: { type: [String], required: true },
  difficulty: { type: String, default: 'All' },
  total: { type: Number, required: true, min: 1 },
  correct: { type: Number, required: true, min: 0 },
  durationSeconds: { type: Number, default: 0, min: 0 },
  breakdown: { type: [breakdownSchema], default: [] },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('QuizAttempt', quizAttemptSchema);
