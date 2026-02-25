import { mock, json } from './mock-server';
import { db } from './db';
import { seedDummyData } from './seed';

function requireAuth() {
  const session = db.session.get();
  if (!session) {
    return null;
  }
  return session;
}

function unauthorized() {
  return json({ message: 'Unauthorized' }, { status: 401 });
}

async function readBody(req: Request) {
  try {
    return await req.json();
  } catch {
    return {};
  }
}

export function registerHandlers() {
  // ── Auth ──────────────────────────────────────────────────

  mock.post('/api/auth/signup', async (req) => {
    const { email, username, password } = await readBody(req);

    if (db.users.findByEmail(email)) {
      return json({ message: 'Email already in use' }, { status: 409 });
    }

    const user = db.users.create({
      email,
      username: username || email.split('@')[0],
      password,
      fullname: username || email.split('@')[0],
      avatar: null,
      birthdate: '',
      preferences: {},
      phonenumber: { countryCode: '', number: '' },
    });

    const token = `token-${user.id}`;
    db.session.set({ uid: user.id, token });

    return json({
      user: { uid: user.id, email: user.email, displayName: user.username, photoURL: null },
      userData: {
        id: user.id, email: user.email, username: user.username,
        fullname: user.username, avatar: null, birthdate: '',
        preferences: {}, phonenumber: { countryCode: '', number: '' },
      },
      sessionToken: token,
    });
  });

  mock.post('/api/auth/signin', async (req) => {
    const { email, password } = await readBody(req);

    let user = db.users.findByEmail(email);
    if (!user) {
      user = db.users.create({
        email,
        username: email.split('@')[0],
        password: password || '',
        fullname: email.split('@')[0],
        avatar: null,
        birthdate: '',
        preferences: {},
        phonenumber: { countryCode: '', number: '' },
      });
    }

    const token = `token-${user.id}`;
    db.session.set({ uid: user.id, token });

    seedDummyData(user.id);

    return json({
      user: { uid: user.id, email: user.email, displayName: user.username, photoURL: user.avatar },
      userData: {
        id: user.id, email: user.email, username: user.username,
        fullname: user.fullname || user.username, avatar: user.avatar,
        birthdate: user.birthdate, preferences: user.preferences,
        phonenumber: user.phonenumber,
      },
      sessionToken: token,
    });
  });

  mock.post('/api/auth/signout', () => {
    db.session.set(null);
    return json({ success: true });
  });

  mock.get('/api/auth/profile', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();

    const user = db.users.get(auth.uid);
    if (!user) return json({ message: 'User not found' }, { status: 404 });

    return json({
      uid: user.id, email: user.email,
      displayName: user.fullname || user.username,
      photoURL: user.avatar, emailVerified: true,
      phoneNumber: user.phonenumber?.number || null,
    });
  });

  mock.patch('/api/auth/profile', async (req) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();

    const updates = await readBody(req);
    const user = db.users.get(auth.uid);
    if (!user) return json({ message: 'User not found' }, { status: 404 });

    if (updates.displayName !== undefined) user.fullname = updates.displayName;
    if (updates.photoURL !== undefined) user.avatar = updates.photoURL;
    if (updates.email !== undefined) user.email = updates.email;
    db.users.update(auth.uid, user);

    return json({ success: true });
  });

  mock.post('/api/auth/password-reset', () => json({ success: true }));
  mock.post('/api/auth/email-verification', () => json({ success: true }));
  mock.post('/api/auth/reauthenticate', () => json({ success: true }));

  mock.delete('/api/auth/account', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    db.users.delete(auth.uid);
    db.session.set(null);
    return json({ success: true });
  });

  // ── Users ─────────────────────────────────────────────────

  mock.get('/api/users', (req) => {
    const url = new URL(req.url, 'http://localhost');
    const username = url.searchParams.get('username');
    if (username) {
      const exists = !!db.users.findByUsername(username);
      return json({ exists });
    }
    return json({ exists: false });
  });

  mock.get('/api/users/:id', (_req, params) => {
    const user = db.users.get(params.id);
    if (!user) return json({ message: 'User not found' }, { status: 404 });
    const { password: _, ...safeUser } = user;
    return json(safeUser);
  });

  mock.post('/api/users/:id', async (req, params) => {
    const data = await readBody(req);
    const existing = db.users.get(params.id);
    if (existing) {
      const updated = db.users.update(params.id, data);
      return json(updated);
    }
    const user = db.users.create({ ...data, id: params.id, password: '' });
    return json(user);
  });

  mock.patch('/api/users/:id', async (req, params) => {
    const data = await readBody(req);
    const updated = db.users.update(params.id, data);
    if (!updated) return json({ message: 'User not found' }, { status: 404 });
    return json(updated);
  });

  // ── Todos (meta routes must be registered before parameterized) ──

  mock.get('/api/todos/meta/pinned', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const meta = db.todos.getMeta(auth.uid);
    return json({ pinned: meta.pinned || '' });
  });

  mock.put('/api/todos/meta/pinned', async (req) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const { uid } = await readBody(req);
    db.todos.setMeta(auth.uid, { pinned: uid });
    return json({ success: true });
  });

  mock.delete('/api/todos/meta/pinned', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    db.todos.clearPinned(auth.uid);
    return json({ success: true });
  });

  mock.get('/api/todos/meta/latest', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const meta = db.todos.getMeta(auth.uid);
    return json({ latestChanged: meta.latestChanged || '' });
  });

  mock.put('/api/todos/meta/latest', async (req) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const { uid } = await readBody(req);
    db.todos.setMeta(auth.uid, { latestChanged: uid });
    return json({ success: true });
  });

  mock.get('/api/todos', () => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    return json(db.todos.getAll(auth.uid));
  });

  mock.get('/api/todos/:id', (_req, params) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const todo = db.todos.get(auth.uid, params.id);
    if (!todo) return json({ message: 'Todo not found' }, { status: 404 });
    return json(todo);
  });

  mock.post('/api/todos', async (req) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const data = await readBody(req);
    const todo = db.todos.create(auth.uid, data);
    return json(todo, { status: 201 });
  });

  mock.put('/api/todos/:id', async (req, params) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    const data = await readBody(req);
    db.todos.update(auth.uid, params.id, data);
    return json({ success: true });
  });

  mock.delete('/api/todos/:id', (_req, params) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();
    db.todos.delete(auth.uid, params.id);
    return json({ success: true });
  });

  // ── Timelines ─────────────────────────────────────────────

  mock.get('/api/timelines/:uid/events', (_req, params) => {
    return json(db.timelines.getEvents(params.uid));
  });

  mock.get('/api/timelines/:uid/events/:id', (_req, params) => {
    const event = db.timelines.getEvent(params.uid, params.id);
    if (!event) return json({ message: 'Event not found' }, { status: 404 });
    return json(event);
  });

  mock.post('/api/timelines/:uid/events', async (req, params) => {
    const data = await readBody(req);
    const event = db.timelines.addEvent(params.uid, data);
    return json(event, { status: 201 });
  });

  mock.put('/api/timelines/:uid/events/:id', async (req, params) => {
    const data = await readBody(req);
    db.timelines.updateEvent(params.uid, params.id, data);
    return json({ success: true });
  });

  mock.delete('/api/timelines/:uid/events/:id', (_req, params) => {
    db.timelines.deleteEvent(params.uid, params.id);
    return json({ success: true });
  });

  mock.delete('/api/timelines/:uid', (_req, params) => {
    db.timelines.deleteTimeline(params.uid);
    return json({ success: true });
  });

  // ── Pomodoro ───────────────────────────────────────────────

  mock.post('/api/pomodoro/:todoId/start', async (req, params) => {
    const { type, durationMinutes } = await readBody(req);
    const session = db.pomodoro.start(params.todoId, type || 'work', durationMinutes || 25);
    return json(session, { status: 201 });
  });

  mock.post('/api/pomodoro/:todoId/complete/:sessionId', (_req, params) => {
    const session = db.pomodoro.complete(params.todoId, params.sessionId);
    if (!session) return json({ message: 'Session not found' }, { status: 404 });
    return json(session);
  });

  mock.post('/api/pomodoro/:todoId/cancel/:sessionId', (_req, params) => {
    const session = db.pomodoro.cancel(params.todoId, params.sessionId);
    if (!session) return json({ message: 'Session not found' }, { status: 404 });
    return json(session);
  });

  mock.get('/api/pomodoro/:todoId', (_req, params) => {
    return json(db.pomodoro.getByTodo(params.todoId));
  });

  mock.get('/api/pomodoro', () => {
    return json(db.pomodoro.getAll());
  });

  // ── Retrospective ─────────────────────────────────────────

  mock.get('/api/retro/todo/:todoId', (_req, params) => {
    const events = db.timelines.getEvents(params.todoId);
    const sessions = db.pomodoro.getByTodo(params.todoId);
    const completedWork = sessions.filter((s: any) => s.type === 'work' && s.completed);
    const completedBreaks = sessions.filter((s: any) => s.type === 'break' && s.completed);
    const updates = events.filter((e: any) => !e.type || e.type === 'UPDATE');

    return json({
      todoId: params.todoId,
      period: 'todo',
      totalPomodoros: completedWork.length,
      totalWorkMinutes: completedWork.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0),
      totalBreakMinutes: completedBreaks.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0),
      totalUpdates: updates.length,
      events,
      pomodoroSessions: sessions,
    });
  });

  mock.get('/api/retro/period/:period', (req, params) => {
    const auth = requireAuth();
    if (!auth) return unauthorized();

    const url = new URL(req.url, 'http://localhost');
    const dateParam = url.searchParams.get('date') || new Date().toISOString();
    const refDate = new Date(dateParam);
    const period = params.period as 'day' | 'week' | 'month';

    let startDate: Date, endDate: Date;
    if (period === 'day') {
      startDate = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate());
      endDate = new Date(startDate.getTime() + 86400000);
    } else if (period === 'week') {
      const dayOfWeek = refDate.getDay();
      startDate = new Date(refDate.getFullYear(), refDate.getMonth(), refDate.getDate() - dayOfWeek);
      endDate = new Date(startDate.getTime() + 7 * 86400000);
    } else {
      startDate = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
      endDate = new Date(refDate.getFullYear(), refDate.getMonth() + 1, 1);
    }

    const allSessions = db.pomodoro.getAll().filter((s: any) => {
      const t = new Date(s.startedAt).getTime();
      return t >= startDate.getTime() && t < endDate.getTime();
    });

    const userTodos = db.todos.getAll(auth.uid);
    const allEvents: any[] = [];
    userTodos.forEach((todo: any) => {
      const events = db.timelines.getEvents(todo.id);
      events.forEach((e: any) => {
        const t = new Date(e.timestamp).getTime();
        if (t >= startDate.getTime() && t < endDate.getTime()) {
          allEvents.push({ ...e, todoId: todo.id, todoName: todo.todo });
        }
      });
    });

    const completedWork = allSessions.filter((s: any) => s.type === 'work' && s.completed);
    const completedBreaks = allSessions.filter((s: any) => s.type === 'break' && s.completed);
    const updates = allEvents.filter((e: any) => !e.type || e.type === 'UPDATE');

    return json({
      period,
      totalPomodoros: completedWork.length,
      totalWorkMinutes: completedWork.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0),
      totalBreakMinutes: completedBreaks.reduce((sum: number, s: any) => sum + (s.durationMinutes || 0), 0),
      totalUpdates: updates.length,
      events: allEvents,
      pomodoroSessions: allSessions,
    });
  });

  // ── Storage ───────────────────────────────────────────────

  mock.post('/api/storage/upload', () => {
    const mockUrl = `https://mock-storage.example.com/images/${Date.now()}`;
    return json({ downloadURL: mockUrl });
  });
}
