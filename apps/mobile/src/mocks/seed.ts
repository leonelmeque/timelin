import { db } from './db';

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600000).toISOString();
}

function daysAgo(d: number): string {
  return new Date(Date.now() - d * 86400000).toISOString();
}

function daysFromNow(d: number): string {
  return new Date(Date.now() + d * 86400000).toISOString();
}

export function seedDummyData(userId: string) {
  const todoMap = new Map<string, string>();

  // ── Todo 1: Active task with pomodoros ─────────────────────
  const todo1 = db.todos.create(userId, {
    todo: 'Build authentication module',
    description: 'Implement login, signup and session management with Supabase',
    timestamp: daysAgo(3),
    status: 'ON_GOING',
    color: '#E3F2FD',
    startDate: daysAgo(3),
    endDate: '',
    deadline: daysFromNow(4),
    organizePeriod: 'week',
  });
  todoMap.set('auth', todo1.id);

  db.timelines.addEvent(todo1.id, {
    title: 'Started research',
    description: 'Looked into Supabase auth docs and examples',
    timestamp: daysAgo(3),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo1.id, {
    title: 'Setup Supabase project',
    description: 'Created project, configured env variables',
    timestamp: daysAgo(2),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo1.id, {
    title: 'Implemented sign up flow',
    description: 'Email/password signup with email verification',
    timestamp: daysAgo(1),
    creator: userId,
    type: 'UPDATE',
  });

  db.pomodoro.addRecord({ id: 'pomo-1a', todoId: todo1.id, type: 'work', startedAt: daysAgo(3), endedAt: daysAgo(3), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-1b', todoId: todo1.id, type: 'break', startedAt: daysAgo(3), endedAt: daysAgo(3), durationMinutes: 5, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-1c', todoId: todo1.id, type: 'work', startedAt: daysAgo(2), endedAt: daysAgo(2), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-1d', todoId: todo1.id, type: 'break', startedAt: daysAgo(2), endedAt: daysAgo(2), durationMinutes: 5, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-1e', todoId: todo1.id, type: 'work', startedAt: daysAgo(1), endedAt: daysAgo(1), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-1f', todoId: todo1.id, type: 'work', startedAt: hoursAgo(4), endedAt: hoursAgo(4), durationMinutes: 25, completed: true });

  // ── Todo 2: Completed task ────────────────────────────────
  const todo2 = db.todos.create(userId, {
    todo: 'Design landing page',
    description: 'Create wireframes and high-fidelity designs for the landing page',
    timestamp: daysAgo(7),
    status: 'COMPLETED',
    color: '#E8F5E9',
    startDate: daysAgo(7),
    endDate: daysAgo(2),
    deadline: daysAgo(1),
    organizePeriod: 'week',
  });
  todoMap.set('design', todo2.id);

  db.timelines.addEvent(todo2.id, {
    title: 'Wireframes done',
    description: 'Low-fidelity wireframes completed in Figma',
    timestamp: daysAgo(6),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo2.id, {
    title: 'Color palette selected',
    description: 'Chose primary and secondary colors, tested accessibility',
    timestamp: daysAgo(5),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo2.id, {
    title: 'Hi-fi designs complete',
    description: 'All screens designed and ready for development',
    timestamp: daysAgo(3),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo2.id, {
    title: 'Design review passed',
    description: 'Team approved the designs with minor feedback',
    timestamp: daysAgo(2),
    creator: userId,
    type: 'UPDATE',
  });

  db.pomodoro.addRecord({ id: 'pomo-2a', todoId: todo2.id, type: 'work', startedAt: daysAgo(6), endedAt: daysAgo(6), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2b', todoId: todo2.id, type: 'break', startedAt: daysAgo(6), endedAt: daysAgo(6), durationMinutes: 5, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2c', todoId: todo2.id, type: 'work', startedAt: daysAgo(5), endedAt: daysAgo(5), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2d', todoId: todo2.id, type: 'work', startedAt: daysAgo(4), endedAt: daysAgo(4), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2e', todoId: todo2.id, type: 'break', startedAt: daysAgo(4), endedAt: daysAgo(4), durationMinutes: 5, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2f', todoId: todo2.id, type: 'work', startedAt: daysAgo(3), endedAt: daysAgo(3), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-2g', todoId: todo2.id, type: 'work', startedAt: daysAgo(2), endedAt: daysAgo(2), durationMinutes: 25, completed: true });

  // ── Todo 3: Today's task (no pomodoros yet) ───────────────
  const todo3 = db.todos.create(userId, {
    todo: 'Write API documentation',
    description: 'Document all REST endpoints with request/response examples',
    timestamp: hoursAgo(2),
    status: 'TODO',
    color: '#FFF3E0',
    startDate: '',
    endDate: '',
    deadline: daysFromNow(2),
    organizePeriod: 'day',
  });
  todoMap.set('docs', todo3.id);

  // ── Todo 4: On hold task ──────────────────────────────────
  const todo4 = db.todos.create(userId, {
    todo: 'Migrate database schema',
    description: 'Move from SQLite to PostgreSQL, write migration scripts',
    timestamp: daysAgo(10),
    status: 'ON_HOLD',
    color: '#FCE4EC',
    startDate: daysAgo(10),
    endDate: '',
    deadline: daysFromNow(14),
    organizePeriod: 'month',
  });
  todoMap.set('db', todo4.id);

  db.timelines.addEvent(todo4.id, {
    title: 'Schema analysis started',
    description: 'Mapped all existing tables and relationships',
    timestamp: daysAgo(10),
    creator: userId,
    type: 'UPDATE',
  });
  db.timelines.addEvent(todo4.id, {
    title: 'Blocked - waiting on DevOps',
    description: 'Need production DB credentials to proceed',
    timestamp: daysAgo(8),
    creator: userId,
    type: 'UPDATE',
  });

  db.pomodoro.addRecord({ id: 'pomo-4a', todoId: todo4.id, type: 'work', startedAt: daysAgo(10), endedAt: daysAgo(10), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-4b', todoId: todo4.id, type: 'work', startedAt: daysAgo(9), endedAt: daysAgo(9), durationMinutes: 25, completed: true });

  // ── Todo 5: Another active task ───────────────────────────
  const todo5 = db.todos.create(userId, {
    todo: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    timestamp: daysAgo(1),
    status: 'ON_GOING',
    color: '#F3E5F5',
    startDate: daysAgo(1),
    endDate: '',
    deadline: daysFromNow(7),
    organizePeriod: 'week',
  });
  todoMap.set('cicd', todo5.id);

  db.timelines.addEvent(todo5.id, {
    title: 'Researched workflow options',
    description: 'Compared GitHub Actions, CircleCI, and Jenkins',
    timestamp: daysAgo(1),
    creator: userId,
    type: 'UPDATE',
  });

  db.pomodoro.addRecord({ id: 'pomo-5a', todoId: todo5.id, type: 'work', startedAt: hoursAgo(6), endedAt: hoursAgo(6), durationMinutes: 25, completed: true });
  db.pomodoro.addRecord({ id: 'pomo-5b', todoId: todo5.id, type: 'break', startedAt: hoursAgo(5), endedAt: hoursAgo(5), durationMinutes: 5, completed: true });

  // Set pinned and latest
  db.todos.setMeta(userId, { pinned: todo1.id, latestChanged: todo5.id });

  console.log('[Seed] Dummy data seeded: 5 todos, timeline events, and pomodoro sessions');
}
