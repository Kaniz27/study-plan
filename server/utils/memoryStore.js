import bcrypt from 'bcryptjs';

export const memoryStore = {
  users: [],
  tasks: [],
  sessions: [],
  schedules: [],
  transactions: [],
  quizAttempts: [],
  enabled: !process.env.MONGO_URI
};

const dayOffset = (days) => new Date(Date.now() + 86400000 * days).toISOString();

export async function seedDemoUser() {
  if (!memoryStore.enabled || memoryStore.users.length) return;
  memoryStore.users.push({
    _id: 'demo-user',
    name: 'Demo Student',
    email: 'demo@studyflow.app',
    password: await bcrypt.hash('123456', 10),
    completedDates: [],
    university: 'StudyFlow University',
    bio: 'Learning something new every day.',
    monthlyBudget: 600,
    createdAt: new Date().toISOString()
  });
  memoryStore.tasks.push(
    { _id: 'demo-task-1', userId: 'demo-user', title: 'Review database normalization', subject: 'Database', priority: 'High', dueDate: dayOffset(0), startTime: '16:00', duration: 45, color: '#7c3aed', notes: 'Focus on 2NF and 3NF examples.', isCompleted: false, createdAt: dayOffset(0) },
    { _id: 'demo-task-2', userId: 'demo-user', title: 'Practice recursion problems', subject: 'Programming', priority: 'Medium', dueDate: dayOffset(2), startTime: '10:30', duration: 60, color: '#f97316', notes: '', isCompleted: false, createdAt: dayOffset(0) }
  );
  memoryStore.schedules.push(
    { _id: 'schedules-demo-1', userId: 'demo-user', subject: 'Database Systems', instructor: 'Dr. Rahman', description: 'ER diagrams and normalization', location: 'Room 204', date: dayOffset(0), startTime: '10:00', endTime: '11:30', createdAt: dayOffset(0) },
    { _id: 'schedules-demo-2', userId: 'demo-user', subject: 'Web Development', instructor: 'Ms. Chowdhury', description: 'React hooks workshop', location: 'Lab 3', date: dayOffset(1), startTime: '14:00', endTime: '15:30', createdAt: dayOffset(0) },
    { _id: 'schedules-demo-3', userId: 'demo-user', subject: 'Discrete Mathematics', instructor: 'Prof. Ahmed', description: 'Graph theory basics', location: 'Room 110', date: dayOffset(3), startTime: '09:00', endTime: '10:00', createdAt: dayOffset(0) }
  );
  memoryStore.transactions.push(
    { _id: 'transactions-demo-1', userId: 'demo-user', type: 'Income', category: 'Allowance', amount: 500, date: dayOffset(-2), description: 'Monthly allowance', priority: 'High', createdAt: dayOffset(0) },
    { _id: 'transactions-demo-2', userId: 'demo-user', type: 'Expense', category: 'Books & Supplies', amount: 45.5, date: dayOffset(-1), description: 'Algorithms textbook', priority: 'High', createdAt: dayOffset(0) },
    { _id: 'transactions-demo-3', userId: 'demo-user', type: 'Expense', category: 'Food', amount: 12.75, date: dayOffset(0), description: 'Lunch with classmates', priority: 'Low', createdAt: dayOffset(0) }
  );
  memoryStore.quizAttempts.push(
    { _id: 'quizAttempts-demo-1', userId: 'demo-user', categories: ['Javascript'], difficulty: 'All', total: 10, correct: 6, durationSeconds: 340, breakdown: [{ category: 'Javascript', correct: 6, total: 10 }], date: dayOffset(-3), createdAt: dayOffset(-3) },
    { _id: 'quizAttempts-demo-2', userId: 'demo-user', categories: ['Html', 'Css'], difficulty: 'Easy', total: 10, correct: 8, durationSeconds: 280, breakdown: [{ category: 'Html', correct: 5, total: 5 }, { category: 'Css', correct: 3, total: 5 }], date: dayOffset(-1), createdAt: dayOffset(-1) }
  );
}
