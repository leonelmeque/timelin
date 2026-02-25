import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { usePomodoro, PomodoroState } from './use-pomodoro';

function getStateLabel(state: PomodoroState): string {
  switch (state) {
    case 'working': return 'FOCUS TIME';
    case 'break': return 'BREAK TIME';
    case 'paused': return 'PAUSED';
    default: return 'READY TO FOCUS';
  }
}

function getStateColor(state: PomodoroState) {
  switch (state) {
    case 'working': return { text: 'text-primary-500', bar: 'bg-primary-500' };
    case 'break': return { text: 'text-success-500', bar: 'bg-success-500' };
    case 'paused': return { text: 'text-warning-500', bar: 'bg-warning-500' };
    default: return { text: 'text-gray-400', bar: 'bg-gray-300' };
  }
}

type Props = { todoId: string };

export const PomodoroTimer: React.FC<Props> = ({ todoId }) => {
  const {
    state, displayTime, progress, sessionCount,
    startWork, pause, resume, stop, skip,
  } = usePomodoro(todoId);

  const colors = getStateColor(state);

  return (
    <View className="p-4 rounded-2xl bg-gray-50">
      {/* Timer display */}
      <View className="items-center justify-center py-6">
        <Text className={`text-xs font-bold tracking-widest ${colors.text}`}>
          {getStateLabel(state)}
        </Text>
        <View className="h-1" />
        <Text className={`text-5xl font-bold ${colors.text}`} style={{ fontVariant: ['tabular-nums'] }}>
          {displayTime}
        </Text>
      </View>

      {/* Progress bar */}
      <View className="h-1 rounded-full bg-gray-200 mx-4 overflow-hidden">
        <View
          className={`h-full rounded-full ${colors.bar}`}
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </View>

      {/* Session dots */}
      <View className="flex-row justify-center mt-2 gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 rounded-full ${i < (sessionCount % 4) ? 'bg-primary-500' : 'bg-gray-200'}`}
          />
        ))}
      </View>

      <View className="h-4" />

      {/* Controls */}
      <View className="flex-row justify-center items-center">
        {state === 'idle' && (
          <Pressable
            onPress={startWork}
            className="w-16 h-16 rounded-full bg-primary-500 items-center justify-center active:opacity-90"
          >
            <MaterialIcons name="play-arrow" size={32} color="white" />
          </Pressable>
        )}

        {state === 'working' && (
          <View className="flex-row items-center">
            <Pressable
              onPress={stop}
              className="w-12 h-12 rounded-full bg-danger-50 items-center justify-center mr-4"
            >
              <MaterialIcons name="stop" size={24} color="#842e39" />
            </Pressable>
            <Pressable
              onPress={pause}
              className="w-16 h-16 rounded-full bg-warning-500 items-center justify-center active:opacity-90"
            >
              <MaterialIcons name="pause" size={32} color="white" />
            </Pressable>
          </View>
        )}

        {state === 'paused' && (
          <View className="flex-row items-center">
            <Pressable
              onPress={stop}
              className="w-12 h-12 rounded-full bg-danger-50 items-center justify-center mr-4"
            >
              <MaterialIcons name="stop" size={24} color="#842e39" />
            </Pressable>
            <Pressable
              onPress={resume}
              className="w-16 h-16 rounded-full bg-primary-500 items-center justify-center active:opacity-90"
            >
              <MaterialIcons name="play-arrow" size={32} color="white" />
            </Pressable>
          </View>
        )}

        {state === 'break' && (
          <View className="flex-row items-center">
            <Pressable
              onPress={skip}
              className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-4"
            >
              <MaterialIcons name="skip-next" size={24} color="#3d3c41" />
            </Pressable>
            <View className="w-16 h-16 rounded-full bg-success-500 items-center justify-center">
              <MaterialIcons name="free-breakfast" size={32} color="white" />
            </View>
          </View>
        )}
      </View>

      <View className="h-2" />
      <View className="items-center">
        <Text className="text-xs text-gray-400">
          {sessionCount} pomodoro{sessionCount !== 1 ? 's' : ''} completed
        </Text>
      </View>
    </View>
  );
};
