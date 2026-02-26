import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { PomodoroSession } from '../lib/shared-types';
import { api } from '../lib';

export type PomodoroPhase = 'idle' | 'working' | 'shortBreak' | 'longBreak' | 'paused';

const WORK_MINUTES = 25;
const SHORT_BREAK_MINUTES = 5;
const LONG_BREAK_MINUTES = 20;
const SESSIONS_BEFORE_LONG_BREAK = 4;

type PomodoroContextType = {
  phase: PomodoroPhase;
  secondsLeft: number;
  displayTime: string;
  pomodoroCount: number;
  activeTodoId: string | null;
  activeTodoName: string;
  isBreak: boolean;
  startWork: (todoId: string, todoName: string) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  skipBreak: () => void;
  takeBreak: () => void;
};

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export function usePomodoroContext() {
  const ctx = useContext(PomodoroContext);
  if (!ctx) throw new Error('usePomodoroContext must be used within PomodoroProvider');
  return ctx;
}

function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<PomodoroPhase>('idle');
  const [secondsLeft, setSecondsLeft] = useState(WORK_MINUTES * 60);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [activeTodoId, setActiveTodoId] = useState<string | null>(null);
  const [activeTodoName, setActiveTodoName] = useState('');
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedSecondsRef = useRef(0);
  const pausedPhaseRef = useRef<PomodoroPhase>('working');
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

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

  const handleTimerEnd = useCallback(async () => {
    clearTimer();

    if (currentSession && activeTodoId) {
      try { await api.pomodoro.complete(activeTodoId, currentSession.id); } catch {}
    }

    const currentPhase = phaseRef.current;

    if (currentPhase === 'working') {
      const newCount = pomodoroCount + 1;
      setPomodoroCount(newCount);

      const isLongBreak = newCount % SESSIONS_BEFORE_LONG_BREAK === 0;
      const breakMinutes = isLongBreak ? LONG_BREAK_MINUTES : SHORT_BREAK_MINUTES;
      const breakPhase: PomodoroPhase = isLongBreak ? 'longBreak' : 'shortBreak';

      try {
        const s = await api.pomodoro.start(activeTodoId!, 'break', breakMinutes);
        setCurrentSession(s);
      } catch {}

      setPhase(breakPhase);
      runTimer(breakMinutes * 60);
    } else if (currentPhase === 'shortBreak') {
      setPhase('idle');
      setCurrentSession(null);
      setSecondsLeft(WORK_MINUTES * 60);
    } else if (currentPhase === 'longBreak') {
      setPomodoroCount(0);
      setPhase('idle');
      setCurrentSession(null);
      setActiveTodoId(null);
      setActiveTodoName('');
      setSecondsLeft(WORK_MINUTES * 60);
    }
  }, [currentSession, activeTodoId, pomodoroCount, clearTimer, runTimer]);

  useEffect(() => {
    if (secondsLeft === 0 && phase !== 'idle') {
      handleTimerEnd();
    }
  }, [secondsLeft]);

  useEffect(() => clearTimer, [clearTimer]);

  const startWork = useCallback(async (todoId: string, todoName: string) => {
    try {
      const s = await api.pomodoro.start(todoId, 'work', WORK_MINUTES);
      setCurrentSession(s);
      setActiveTodoId(todoId);
      setActiveTodoName(todoName);
      setPhase('working');
      runTimer(WORK_MINUTES * 60);
    } catch (e) { console.error(e); }
  }, [runTimer]);

  const pause = useCallback(() => {
    clearTimer();
    pausedSecondsRef.current = secondsLeft;
    pausedPhaseRef.current = phase as PomodoroPhase;
    setPhase('paused');
  }, [secondsLeft, phase, clearTimer]);

  const resume = useCallback(() => {
    setPhase(pausedPhaseRef.current);
    runTimer(pausedSecondsRef.current);
  }, [runTimer]);

  const stop = useCallback(async () => {
    clearTimer();
    if (currentSession && activeTodoId) {
      try { await api.pomodoro.cancel(activeTodoId, currentSession.id); } catch {}
    }
    setPhase('idle');
    setCurrentSession(null);
    setPomodoroCount(0);
    setActiveTodoId(null);
    setActiveTodoName('');
    setSecondsLeft(WORK_MINUTES * 60);
  }, [clearTimer, currentSession, activeTodoId]);

  const skipBreak = useCallback(async () => {
    if (phase !== 'shortBreak' && phase !== 'longBreak') return;
    clearTimer();
    if (currentSession && activeTodoId) {
      try { await api.pomodoro.complete(activeTodoId, currentSession.id); } catch {}
    }
    if (phase === 'longBreak') {
      setPomodoroCount(0);
      setPhase('idle');
      setCurrentSession(null);
      setActiveTodoId(null);
      setActiveTodoName('');
    } else {
      setPhase('idle');
      setCurrentSession(null);
    }
    setSecondsLeft(WORK_MINUTES * 60);
  }, [phase, clearTimer, currentSession, activeTodoId]);

  const takeBreak = useCallback(async () => {
    if (phase !== 'working' && phase !== 'paused') return;
    clearTimer();

    if (currentSession && activeTodoId) {
      try { await api.pomodoro.complete(activeTodoId, currentSession.id); } catch {}
    }

    const newCount = pomodoroCount + 1;
    setPomodoroCount(newCount);

    const isLong = newCount % SESSIONS_BEFORE_LONG_BREAK === 0;
    const breakMinutes = isLong ? LONG_BREAK_MINUTES : SHORT_BREAK_MINUTES;
    const breakPhase: PomodoroPhase = isLong ? 'longBreak' : 'shortBreak';

    try {
      const s = await api.pomodoro.start(activeTodoId!, 'break', breakMinutes);
      setCurrentSession(s);
    } catch {}

    setPhase(breakPhase);
    runTimer(breakMinutes * 60);
  }, [phase, clearTimer, currentSession, activeTodoId, pomodoroCount, runTimer]);

  const isBreak = phase === 'shortBreak' || phase === 'longBreak';

  return (
    <PomodoroContext.Provider value={{
      phase, secondsLeft, displayTime: formatTime(secondsLeft),
      pomodoroCount, activeTodoId, activeTodoName, isBreak,
      startWork, pause, resume, stop, skipBreak, takeBreak,
    }}>
      {children}
    </PomodoroContext.Provider>
  );
}
