import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { usePomodoroContext, PomodoroPhase } from '~/context/pomodoro-context';

type Props = {
  todoId: string;
  todoName: string;
};

function getPhaseDisplay(phase: PomodoroPhase) {
  switch (phase) {
    case 'working': return { label: 'Focusing', icon: 'timer' as const, color: '#3D3868', bg: 'bg-primary-50' };
    case 'shortBreak': return { label: 'Short Break (5 min)', icon: 'free-breakfast' as const, color: '#386d36', bg: 'bg-success-50' };
    case 'longBreak': return { label: 'Long Break (20 min)', icon: 'self-improvement' as const, color: '#2383E2', bg: 'bg-tag-blue' };
    case 'paused': return { label: 'Paused', icon: 'pause' as const, color: '#84712e', bg: 'bg-warning-50' };
    default: return { label: 'Pomodoro Timer', icon: 'timer' as const, color: '#3D3868', bg: 'bg-primary-50' };
  }
}

export const PomodoroTimer: React.FC<Props> = ({ todoId, todoName }) => {
  const {
    phase, displayTime, pomodoroCount, activeTodoId,
    startWork, pause, resume, stop, skipBreak, takeBreak,
  } = usePomodoroContext();

  const isThisTodo = activeTodoId === todoId;
  const isActive = phase !== 'idle' && isThisTodo;
  const isBusy = phase !== 'idle' && !isThisTodo;
  const isBreak = phase === 'shortBreak' || phase === 'longBreak';

  const display = getPhaseDisplay(isActive ? phase : 'idle');

  return (
    <View className={`p-3 rounded-xl ${isActive ? display.bg : 'bg-gray-50'}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="w-9 h-9 rounded-full bg-white/80 items-center justify-center mr-3">
            <MaterialIcons name={display.icon} size={18} color={display.color} />
          </View>
          <View className="flex-1">
            {isActive ? (
              <>
                <Text className="text-sm font-semibold text-fg">
                  {display.label} — {displayTime}
                </Text>
                <Text className="text-xs text-fg-tertiary">
                  {pomodoroCount % 4}/4 pomodoros · {isBreak ? 'next: focus session' : `break after this`}
                </Text>
              </>
            ) : (
              <>
                <Text className="text-sm font-medium text-fg">Pomodoro Timer</Text>
                <Text className="text-xs text-fg-tertiary">
                  {isBusy
                    ? `Timer active on another task`
                    : '25 min work · 5 min break · 4 sessions'
                  }
                </Text>
              </>
            )}
          </View>
        </View>

        <View className="flex-row items-center ml-2">
          {isActive && (phase === 'working' || phase === 'paused') && (
            <Pressable onPress={takeBreak} className="h-8 px-2.5 rounded-full bg-white/60 items-center justify-center mr-1.5 flex-row">
              <MaterialIcons name="free-breakfast" size={14} color={display.color} />
              <Text style={{ color: display.color, fontSize: 11, fontWeight: '600', marginLeft: 3 }}>Break</Text>
            </Pressable>
          )}
          {isActive && phase === 'working' && (
            <Pressable onPress={pause} className="w-8 h-8 rounded-full bg-white/60 items-center justify-center mr-1.5">
              <MaterialIcons name="pause" size={16} color={display.color} />
            </Pressable>
          )}
          {isActive && phase === 'paused' && (
            <Pressable onPress={resume} className="w-8 h-8 rounded-full bg-white/60 items-center justify-center mr-1.5">
              <MaterialIcons name="play-arrow" size={16} color={display.color} />
            </Pressable>
          )}
          {isActive && isBreak && (
            <Pressable onPress={skipBreak} className="w-8 h-8 rounded-full bg-white/60 items-center justify-center mr-1.5">
              <MaterialIcons name="skip-next" size={16} color={display.color} />
            </Pressable>
          )}
          {isActive && (
            <Pressable onPress={stop} className="w-8 h-8 rounded-full bg-danger-50 items-center justify-center">
              <MaterialIcons name="stop" size={16} color="#842e39" />
            </Pressable>
          )}
          {!isActive && !isBusy && (
            <Pressable
              onPress={() => startWork(todoId, todoName)}
              className="flex-row items-center px-3 py-1.5 bg-primary-500 rounded-full active:opacity-90"
            >
              <MaterialIcons name="play-arrow" size={16} color="white" />
              <Text className="text-xs font-semibold text-white ml-1">Start</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};
