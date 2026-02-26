import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { usePomodoroContext } from '~/context/pomodoro-context';

type Props = {
  todoId: string;
  todoName: string;
};

export const PomodoroTimer: React.FC<Props> = ({ todoId, todoName }) => {
  const { state, displayTime, sessionCount, activeTodoId, startWork, pause, resume, stop } = usePomodoroContext();

  const isThisTodo = activeTodoId === todoId;
  const isActive = state !== 'idle' && isThisTodo;
  const isBusy = state !== 'idle' && !isThisTodo;

  return (
    <View className="flex-row items-center justify-between p-3 rounded-xl bg-gray-50">
      <View className="flex-row items-center flex-1">
        <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center mr-3">
          <MaterialIcons name="timer" size={20} color="#3D3868" />
        </View>
        <View className="flex-1">
          {isActive ? (
            <>
              <Text className="text-sm font-semibold text-fg">
                {state === 'working' ? 'Focusing' : state === 'break' ? 'Break' : 'Paused'} — {displayTime}
              </Text>
              <Text className="text-xs text-fg-tertiary">{sessionCount} pomodoro{sessionCount !== 1 ? 's' : ''}</Text>
            </>
          ) : (
            <>
              <Text className="text-sm font-medium text-fg">Pomodoro Timer</Text>
              <Text className="text-xs text-fg-tertiary">
                {isBusy ? 'Timer running on another task' : '25 min focus sessions'}
              </Text>
            </>
          )}
        </View>
      </View>

      <View className="flex-row items-center">
        {isActive && (
          <>
            {state === 'working' && (
              <Pressable onPress={pause} className="w-8 h-8 rounded-full bg-warning-50 items-center justify-center mr-2">
                <MaterialIcons name="pause" size={16} color="#84712e" />
              </Pressable>
            )}
            {state === 'paused' && (
              <Pressable onPress={resume} className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center mr-2">
                <MaterialIcons name="play-arrow" size={16} color="#3D3868" />
              </Pressable>
            )}
            <Pressable onPress={stop} className="w-8 h-8 rounded-full bg-danger-50 items-center justify-center">
              <MaterialIcons name="stop" size={16} color="#842e39" />
            </Pressable>
          </>
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
  );
};
