import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true, trim: true, maxlength: 160 },
  subject: { type: String, enum: ['Programming', 'Mathematics', 'English', 'Networking', 'Database', 'Others'], required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: { type: Date },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
