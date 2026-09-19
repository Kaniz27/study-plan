import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  university: { type: String, trim: true, maxlength: 100, default: '' },
  bio: { type: String, trim: true, maxlength: 300, default: '' },
  monthlyBudget: { type: Number, min: 0, default: 0 },
  completedDates: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
