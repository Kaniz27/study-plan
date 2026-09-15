import mongoose from 'mongoose';

export async function connectDB() {
  if (!process.env.MONGO_URI) return console.warn('MONGO_URI missing: running without database');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}
