import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  subject: { type: String, enum: ['Programming', 'Mathematics', 'English', 'Networking', 'Database', 'Web Development', 'Others'], default: 'Others' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: { type: Date },
  startTime: { type: String, default: '' },
  duration: { type: Number, min: 1, max: 1440 },
  color: { type: String, default: '#3b82f6' },
  notes: { type: String, trim: true, maxlength: 1000, default: '' },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
