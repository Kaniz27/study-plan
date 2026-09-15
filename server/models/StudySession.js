import mongoose from 'mongoose';

const studySessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  durationMinutes: { type: Number, required: true, min: 1, max: 240 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('StudySession', studySessionSchema);