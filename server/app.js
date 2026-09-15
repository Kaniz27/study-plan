import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { seedDemoUser, memoryStore } from './utils/memoryStore.js';
import studyRoutes from './routes/studyRoutes.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'StudyFlow API', database: memoryStore.enabled ? 'in-memory' : 'mongodb', hasMongoUri: Boolean(process.env.MONGO_URI) }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api', studyRoutes);
app.use(errorHandler);

connectDB().catch((error) => console.error('Database connection failed:', error.message));
seedDemoUser();

export default app;
