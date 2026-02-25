export enum TimelineEventType {
  UPDATE = 'UPDATE',
  POMODORO = 'POMODORO',
  BREAK = 'BREAK',
}

export type TimelineEventProps = {
  id?: string;
  title: string;
  description: string;
  timestamp: string | number;
  participants?: string[];
  creator: string;
  type?: TimelineEventType;
  durationMinutes?: number;
};

export type TodoProps = {
  id: string;
  todo: string;
  description: string;
  timestamp: string;
  creator?: string;
  status: TodoStatus;
  color: string;
  assigned?: string[];
  startDate: string;
  endDate: string;
  deadline?: string;
  organizePeriod?: 'day' | 'week' | 'month';
};

export type TimelineProps = {
  id: string;
  todo: string;
  events: TimelineEventProps[];
};

export type PomodoroSession = {
  id: string;
  todoId: string;
  type: 'work' | 'break';
  startedAt: string;
  endedAt?: string;
  durationMinutes: number;
  completed: boolean;
};

export type PomodoroSettings = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
};

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

export type RetroSummary = {
  todoId?: string;
  period: 'todo' | 'day' | 'week' | 'month';
  totalPomodoros: number;
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  totalUpdates: number;
  events: TimelineEventProps[];
  pomodoroSessions: PomodoroSession[];
};

export type UserProps = {
  id: string;
  username: string;
  avatar: string;
};

interface Person {
  firstname: string;
  lastname: string;
  birthdate: string;
}

export interface User<P = {}> extends Person {
  id: string;
  fullname?: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  preferences?: P;
  todos: string[];
  phonenumber?: {
    countryCode: string;
    number: string;
  }
}

export type IsLoading = 'FETCHING' | 'ERROR' | 'SUCCESS' | 'IDLE';

export enum TodoStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  TODO = 'TODO',
}

export type UserLogin = Pick<User, 'username' | 'password'>;

export enum TodoStatusTranslation {
  "TODO" = "todo.status.todo",
  "ON_GOING" = "todo.status.on_going",
  "ON_HOLD" = "todo.status.on_hold",
  "COMPLETED" = "todo.status.completed",
}