type UserRecord = {
  id: string;
  email: string;
  username: string;
  fullname?: string;
  avatar: string | null;
  birthdate: string;
  phonenumber?: { countryCode: string; number: string };
  preferences?: Record<string, any>;
  password: string;
};

type TodoRecord = Record<string, any>;
type TimelineEventRecord = Record<string, any>;

type TodoMeta = {
  pinned?: string;
  latestChanged?: string;
};

type PomodoroRecord = {
  id: string;
  todoId: string;
  type: 'work' | 'break';
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  completed: boolean;
};

const users = new Map<string, UserRecord>();
const todos = new Map<string, Map<string, TodoRecord>>();
const todoMeta = new Map<string, TodoMeta>();
const timelines = new Map<string, Map<string, TimelineEventRecord>>();
const pomodoroSessions = new Map<string, PomodoroRecord[]>();

let currentSession: { uid: string; token: string } | null = null;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export const db = {
  session: {
    get: () => currentSession,
    set: (session: { uid: string; token: string } | null) => {
      currentSession = session;
    },
  },

  users: {
    create: (data: Omit<UserRecord, 'id'> & { id?: string }): UserRecord => {
      const id = data.id || generateId();
      const user: UserRecord = { ...data, id };
      users.set(id, user);
      return user;
    },
    get: (id: string): UserRecord | undefined => users.get(id),
    update: (id: string, data: Partial<UserRecord>) => {
      const user = users.get(id);
      if (user) {
        const updated = { ...user, ...data };
        users.set(id, updated);
        return updated;
      }
      return undefined;
    },
    delete: (id: string) => users.delete(id),
    findByEmail: (email: string) =>
      Array.from(users.values()).find((u) => u.email === email),
    findByUsername: (username: string) =>
      Array.from(users.values()).find((u) => u.username === username),
  },

  todos: {
    create: (userId: string, data: TodoRecord): TodoRecord => {
      if (!todos.has(userId)) {
        todos.set(userId, new Map());
      }
      const id = generateId();
      const todo = { ...data, id, creator: userId };
      todos.get(userId)!.set(id, todo);
      return todo;
    },
    getAll: (userId: string): TodoRecord[] => {
      const userTodos = todos.get(userId);
      return userTodos ? Array.from(userTodos.values()) : [];
    },
    get: (userId: string, todoId: string): TodoRecord | undefined => {
      return todos.get(userId)?.get(todoId);
    },
    update: (userId: string, todoId: string, data: TodoRecord) => {
      const userTodos = todos.get(userId);
      if (userTodos) {
        userTodos.set(todoId, { ...data, id: todoId });
      }
    },
    delete: (userId: string, todoId: string) => {
      todos.get(userId)?.delete(todoId);
    },
    getMeta: (userId: string): TodoMeta => {
      return todoMeta.get(userId) || {};
    },
    setMeta: (userId: string, data: Partial<TodoMeta>) => {
      const existing = todoMeta.get(userId) || {};
      todoMeta.set(userId, { ...existing, ...data });
    },
    clearPinned: (userId: string) => {
      const meta = todoMeta.get(userId);
      if (meta) {
        delete meta.pinned;
        todoMeta.set(userId, meta);
      }
    },
  },

  timelines: {
    addEvent: (timelineId: string, data: TimelineEventRecord): TimelineEventRecord => {
      if (!timelines.has(timelineId)) {
        timelines.set(timelineId, new Map());
      }
      const id = generateId();
      const event = { ...data, id };
      timelines.get(timelineId)!.set(id, event);
      return event;
    },
    getEvents: (timelineId: string): TimelineEventRecord[] => {
      const events = timelines.get(timelineId);
      return events ? Array.from(events.values()) : [];
    },
    getEvent: (timelineId: string, eventId: string) => {
      return timelines.get(timelineId)?.get(eventId);
    },
    updateEvent: (timelineId: string, eventId: string, data: TimelineEventRecord) => {
      const events = timelines.get(timelineId);
      if (events) {
        const existing = events.get(eventId);
        events.set(eventId, { ...existing, ...data, id: eventId });
      }
    },
    deleteEvent: (timelineId: string, eventId: string) => {
      timelines.get(timelineId)?.delete(eventId);
    },
    deleteTimeline: (timelineId: string) => {
      timelines.delete(timelineId);
    },
  },

  pomodoro: {
    start: (todoId: string, type: 'work' | 'break', durationMinutes: number): PomodoroRecord => {
      const session: PomodoroRecord = {
        id: generateId(),
        todoId,
        type,
        startedAt: new Date().toISOString(),
        durationMinutes,
        completed: false,
      };
      const existing = pomodoroSessions.get(todoId) || [];
      existing.push(session);
      pomodoroSessions.set(todoId, existing);
      return session;
    },
    complete: (todoId: string, sessionId: string): PomodoroRecord | undefined => {
      const sessions = pomodoroSessions.get(todoId);
      if (!sessions) return undefined;
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        session.completed = true;
        session.endedAt = new Date().toISOString();
      }
      return session;
    },
    cancel: (todoId: string, sessionId: string): PomodoroRecord | undefined => {
      const sessions = pomodoroSessions.get(todoId);
      if (!sessions) return undefined;
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        session.endedAt = new Date().toISOString();
      }
      return session;
    },
    getByTodo: (todoId: string): PomodoroRecord[] => {
      return pomodoroSessions.get(todoId) || [];
    },
    getAll: (): PomodoroRecord[] => {
      return Array.from(pomodoroSessions.values()).flat();
    },
    addRecord: (record: PomodoroRecord) => {
      const existing = pomodoroSessions.get(record.todoId) || [];
      existing.push(record);
      pomodoroSessions.set(record.todoId, existing);
    },
  },
};
