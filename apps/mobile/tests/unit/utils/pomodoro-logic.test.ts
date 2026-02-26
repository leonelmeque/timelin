import {
  DEFAULT_POMODORO_SETTINGS,
  PomodoroSettings,
  PomodoroSession,
  RetroSummary,
  TimelineEventType,
} from '../../../src/lib/shared-types';

describe('Pomodoro Settings', () => {
  it('should have correct default values', () => {
    expect(DEFAULT_POMODORO_SETTINGS.workMinutes).toBe(25);
    expect(DEFAULT_POMODORO_SETTINGS.shortBreakMinutes).toBe(5);
    expect(DEFAULT_POMODORO_SETTINGS.longBreakMinutes).toBe(15);
    expect(DEFAULT_POMODORO_SETTINGS.sessionsBeforeLongBreak).toBe(4);
  });

  it('should allow custom settings', () => {
    const custom: PomodoroSettings = {
      workMinutes: 50,
      shortBreakMinutes: 10,
      longBreakMinutes: 30,
      sessionsBeforeLongBreak: 2,
    };
    expect(custom.workMinutes).toBe(50);
    expect(custom.sessionsBeforeLongBreak).toBe(2);
  });
});

describe('Pomodoro Session Types', () => {
  it('should create a valid work session', () => {
    const session: PomodoroSession = {
      id: 'test-1',
      todoId: 'todo-1',
      type: 'work',
      startedAt: new Date().toISOString(),
      durationMinutes: 25,
      completed: false,
    };
    expect(session.type).toBe('work');
    expect(session.completed).toBe(false);
    expect(session.endedAt).toBeUndefined();
  });

  it('should create a valid break session', () => {
    const session: PomodoroSession = {
      id: 'test-2',
      todoId: 'todo-1',
      type: 'break',
      startedAt: new Date().toISOString(),
      endedAt: new Date().toISOString(),
      durationMinutes: 5,
      completed: true,
    };
    expect(session.type).toBe('break');
    expect(session.completed).toBe(true);
    expect(session.endedAt).toBeDefined();
  });
});

describe('Retrospective Summary Calculations', () => {
  const createSessions = (): PomodoroSession[] => [
    { id: '1', todoId: 't1', type: 'work', startedAt: '2026-02-25T10:00:00Z', endedAt: '2026-02-25T10:25:00Z', durationMinutes: 25, completed: true },
    { id: '2', todoId: 't1', type: 'break', startedAt: '2026-02-25T10:25:00Z', endedAt: '2026-02-25T10:30:00Z', durationMinutes: 5, completed: true },
    { id: '3', todoId: 't1', type: 'work', startedAt: '2026-02-25T10:30:00Z', endedAt: '2026-02-25T10:55:00Z', durationMinutes: 25, completed: true },
    { id: '4', todoId: 't1', type: 'work', startedAt: '2026-02-25T11:00:00Z', durationMinutes: 25, completed: false },
  ];

  function computeRetro(sessions: PomodoroSession[]): Partial<RetroSummary> {
    const completedWork = sessions.filter(s => s.type === 'work' && s.completed);
    const completedBreaks = sessions.filter(s => s.type === 'break' && s.completed);
    return {
      totalPomodoros: completedWork.length,
      totalWorkMinutes: completedWork.reduce((sum, s) => sum + s.durationMinutes, 0),
      totalBreakMinutes: completedBreaks.reduce((sum, s) => sum + s.durationMinutes, 0),
    };
  }

  it('should count only completed work sessions as pomodoros', () => {
    const sessions = createSessions();
    const retro = computeRetro(sessions);
    expect(retro.totalPomodoros).toBe(2);
  });

  it('should sum work minutes from completed sessions only', () => {
    const sessions = createSessions();
    const retro = computeRetro(sessions);
    expect(retro.totalWorkMinutes).toBe(50);
  });

  it('should sum break minutes correctly', () => {
    const sessions = createSessions();
    const retro = computeRetro(sessions);
    expect(retro.totalBreakMinutes).toBe(5);
  });

  it('should handle empty sessions', () => {
    const retro = computeRetro([]);
    expect(retro.totalPomodoros).toBe(0);
    expect(retro.totalWorkMinutes).toBe(0);
    expect(retro.totalBreakMinutes).toBe(0);
  });
});

describe('Timeline Event Types', () => {
  it('should have UPDATE, POMODORO, and BREAK types', () => {
    expect(TimelineEventType.UPDATE).toBe('UPDATE');
    expect(TimelineEventType.POMODORO).toBe('POMODORO');
    expect(TimelineEventType.BREAK).toBe('BREAK');
  });
});
