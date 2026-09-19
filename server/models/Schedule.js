import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  subject: { type: String, required: true, trim: true, maxlength: 100 },
  instructor: { type: String, trim: true, maxlength: 100, default: '' },
  description: { type: String, trim: true, maxlength: 500, default: '' },
  location: { type: String, trim: true, maxlength: 100, default: '' },
  date: { type: Date, required: true },
  startTime: { type: String, default: '' },
  endTime: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);
