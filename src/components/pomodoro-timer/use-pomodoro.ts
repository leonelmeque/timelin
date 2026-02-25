import { useState, useRef, useCallback, useEffect } from 'react';
import { DEFAULT_POMODORO_SETTINGS, PomodoroSettings, PomodoroSession } from '../../lib/shared-types';
import { api } from '../../lib';

export type PomodoroState = 'idle' | 'working' | 'break' | 'paused';

export function usePomodoro(todoId: string, settings: PomodoroSettings = DEFAULT_POMODORO_SETTINGS) {
  const [state, setState] = useState<PomodoroState>('idle');
  const [secondsLeft, setSecondsLeft] = useState(settings.workMinutes * 60);
  const [sessionCount, setSessionCount] = useState(0);
  const [currentSession, setCurrentSession] = useState<PomodoroSession | null>(null);
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedSecondsRef = useRef(0);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback((seconds: number) => {
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

  const handleTimerComplete = useCallback(async () => {
    clearTimer();

    if (currentSession) {
      try {
        await api.pomodoro.complete(todoId, currentSession.id);
      } catch (e) {
        console.error('Failed to complete session:', e);
      }
    }

    if (state === 'working') {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);

      const isLongBreak = newCount % settings.sessionsBeforeLongBreak === 0;
      const breakMinutes = isLongBreak ? settings.longBreakMinutes : settings.shortBreakMinutes;

      try {
        const session = await api.pomodoro.start(todoId, 'break', breakMinutes);
        setCurrentSession(session);
        setSessions((prev) => [...prev, session]);
      } catch (e) {
        console.error('Failed to start break:', e);
      }

      setState('break');
      startTimer(breakMinutes * 60);
    } else if (state === 'break') {
      setState('idle');
      setCurrentSession(null);
      setSecondsLeft(settings.workMinutes * 60);
    }
  }, [state, sessionCount, currentSession, todoId, settings, clearTimer, startTimer]);

  useEffect(() => {
    if (secondsLeft === 0 && state !== 'idle') {
      handleTimerComplete();
    }
  }, [secondsLeft]);

  useEffect(() => clearTimer, [clearTimer]);

  const startWork = useCallback(async () => {
    try {
      const session = await api.pomodoro.start(todoId, 'work', settings.workMinutes);
      setCurrentSession(session);
      setSessions((prev) => [...prev, session]);
      setState('working');
      startTimer(settings.workMinutes * 60);
    } catch (e) {
      console.error('Failed to start work session:', e);
    }
  }, [todoId, settings, startTimer]);

  const pause = useCallback(() => {
    if (state === 'working' || state === 'break') {
      clearTimer();
      pausedSecondsRef.current = secondsLeft;
      setState('paused');
    }
  }, [state, secondsLeft, clearTimer]);

  const resume = useCallback(() => {
    if (state === 'paused') {
      const wasWorking = currentSession?.type === 'work';
      setState(wasWorking ? 'working' : 'break');
      startTimer(pausedSecondsRef.current);
    }
  }, [state, currentSession, startTimer]);

  const stop = useCallback(async () => {
    clearTimer();
    if (currentSession) {
      try {
        await api.pomodoro.cancel(todoId, currentSession.id);
      } catch (e) {
        console.error('Failed to cancel session:', e);
      }
    }
    setState('idle');
    setCurrentSession(null);
    setSecondsLeft(settings.workMinutes * 60);
  }, [clearTimer, currentSession, todoId, settings]);

  const skip = useCallback(async () => {
    if (state === 'break') {
      clearTimer();
      if (currentSession) {
        try {
          await api.pomodoro.complete(todoId, currentSession.id);
        } catch (e) {
          console.error('Failed to complete break:', e);
        }
      }
      setState('idle');
      setCurrentSession(null);
      setSecondsLeft(settings.workMinutes * 60);
    }
  }, [state, clearTimer, currentSession, todoId, settings]);

  const formatTime = useCallback((totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }, []);

  return {
    state,
    secondsLeft,
    sessionCount,
    currentSession,
    sessions,
    displayTime: formatTime(secondsLeft),
    progress: state === 'idle' ? 0 : 1 - secondsLeft / ((state === 'break' || (state === 'paused' && currentSession?.type === 'break')
      ? (sessionCount % settings.sessionsBeforeLongBreak === 0 ? settings.longBreakMinutes : settings.shortBreakMinutes)
      : settings.workMinutes) * 60),
    startWork,
    pause,
    resume,
    stop,
    skip,
  };
}
