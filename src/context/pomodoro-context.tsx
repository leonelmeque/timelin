import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { DEFAULT_POMODORO_SETTINGS, PomodoroSession, PomodoroSettings } from '../lib/shared-types';
import { api } from '../lib';
import { PomodoroState } from '../components/pomodoro-timer/use-pomodoro';

type PomodoroContextType = {
  state: PomodoroState;
  secondsLeft: number;
  displayTime: string;
  sessionCount: number;
  activeTodoId: string | null;
  activeTodoName: string;
  startWork: (todoId: string, todoName: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skip: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export function usePomodoroContext() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error('usePomodoroContext must be used within PomodoroProvider');
  return ctx;
}

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const settings = DEFAULT_POMODORO_SETTINGS;
  const [state, setState] = useState<PomodoroState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(settings.workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(0);
  const [activeTodoId, setActiveTodoId] = useState<string | null>(null);
  const [activeTodoName, setActiveTodoName] = useState('');
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedSecondsRef = useRef(0);
  const stateRef = useRef(state);
  stateRef.current = state;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const runTimer = useCallback((seconds: number) => {
    clearTimer();
    setSecondsLeft(seconds);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  const handleComplete = useCallback(async () => {
    clearTimer();
    if (currentSession && activeTodoId) {
      try { await api.pomodoro.complete(activeTodoId, currentSession.id); } catch {}
    }

    if (stateRef.current === 'working') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      const isLong = newCount % settings.sessionsBeforeLongBreak === 0;
      const breakMin = isLong ? settings.longBreakMinutes : settings.shortBreakMinutes;
      try {
        const s = await api.pomodoro.start(activeTodoId!, 'break', breakMin);
        setCurrentSession(s);
      } catch {}
      setState('break');
      runTimer(breakMin * 60);
    } else if (stateRef.current === 'break') {
      setState('idle');
      setCurrentSession(null);
      setActiveTodoId(null);
      setActiveTodoName('');
      setSecondsLeft(settings.workMinutes * 60);
    }
  }, [currentSession, activeTodoId, sessionCount, settings, clearTimer, runTimer]);

  useEffect(() => {
    if (secondsLeft === 0 && state !== 'idle') {
      handleComplete();
    }
  }, [secondsLeft]);

  useEffect(() => clearTimer, [clearTimer]);

  const startWork = useCallback(async (todoId: string, todoName: string) => {
    try {
      const s = await api.pomodoro.start(todoId, 'work', settings.workMinutes);
      setCurrentSession(s);
      setActiveTodoId(todoId);
      setActiveTodoName(todoName);
      setState('working');
      runTimer(settings.workMinutes * 60);
    } catch (e) { console.error(e); }
  }, [settings, runTimer]);

  const pause = useCallback(() => {
    clearTimer();
    pausedSecondsRef.current = secondsLeft;
    setState('paused');
  }, [secondsLeft, clearTimer]);

  const resume = useCallback(() => {
    setState(currentSession?.type === 'work' ? 'working' : 'break');
    runTimer(pausedSecondsRef.current);
  }, [currentSession, runTimer]);

  const stop = useCallback(async () => {
    clearTimer();
    if (currentSession && activeTodoId) {
      try { await api.pomodoro.cancel(activeTodoId, currentSession.id); } catch {}
    }
    setState('idle');
    setCurrentSession(null);
    setActiveTodoId(null);
    setActiveTodoName('');
    setSecondsLeft(settings.workMinutes * 60);
  }, [clearTimer, currentSession, activeTodoId, settings]);

  const skip = useCallback(async () => {
    if (state !== 'break') return;
    clearTimer();
    if (currentSession && activeTodoId) {
      try { await api.pomodoro.complete(activeTodoId, currentSession.id); } catch {}
    }
    setState('idle');
    setCurrentSession(null);
    setActiveTodoId(null);
    setActiveTodoName('');
    setSecondsLeft(settings.workMinutes * 60);
  }, [state, clearTimer, currentSession, activeTodoId, settings]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <PomodoroContext.Provider value={{
      state, secondsLeft, displayTime: formatTime(secondsLeft),
      sessionCount, activeTodoId, activeTodoName,
      startWork, pause, resume, stop, skip,
    }}>
      {children}
    </PomodoroContext.Provider>
  );
}
