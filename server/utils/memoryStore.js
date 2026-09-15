import bcrypt from 'bcryptjs';

export const memoryStore = {
  users: [],
  tasks: [],
  sessions: [],
  enabled: !process.env.MONGO_URI
};

export async function seedDemoUser() {
  if (!memoryStore.enabled || memoryStore.users.length) return;
  memoryStore.users.push({
    _id: 'demo-user',
    name: 'Demo Student',
    email: 'demo@studyflow.app',
    password: await bcrypt.hash('123456', 10),
    completedDates: []
  });
  memoryStore.tasks.push(
    { _id: 'demo-task-1', userId: 'demo-user', title: 'Review database normalization', subject: 'Database', priority: 'High', dueDate: new Date().toISOString(), isCompleted: false, createdAt: new Date().toISOString() },
    { _id: 'demo-task-2', userId: 'demo-user', title: 'Practice recursion problems', subject: 'Programming', priority: 'Medium', dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), isCompleted: false, createdAt: new Date().toISOString() }
  );
}
