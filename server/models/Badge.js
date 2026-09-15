import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  badgeType: { type: String, required: true },
  unlockedAt: { type: Date, default: Date.now },
}, { timestamps: true });

badgeSchema.index({ userId: 1, badgeType: 1 }, { unique: true });
export default mongoose.model('Badge', badgeSchema);