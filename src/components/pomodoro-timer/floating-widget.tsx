import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { PomodoroState } from './use-pomodoro';

type Props = {
  state: PomodoroState;
  displayTime: string;
  todoId: string;
  todoName: string;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
};

export const PomodoroFloatingWidget: React.FC<Props> = ({
  state,
  displayTime,
  todoId,
  todoName,
  onPause,
  onResume,
  onStop,
}) => {
  const router = useRouter();

  if (state === 'idle') return null;

  const bgColor = state === 'working' ? '#3D3868' : state === 'break' ? '#386d36' : '#84712e';
  const label = state === 'working' ? 'Focusing' : state === 'break' ? 'Break' : 'Paused';

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'web' ? 90 : 100,
        right: 16,
        zIndex: 999,
        backgroundColor: bgColor,
        borderRadius: 16,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        ...(Platform.OS === 'web'
          ? { boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }
          : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }),
      }}
    >
      <Pressable onPress={() => router.push(`/todo/${todoId}`)} className="flex-row items-center flex-1 mr-2">
        <View className="mr-2">
          <Text className="text-xs text-white/70">{label}</Text>
          <Text className="text-base font-bold text-white" style={{ fontVariant: ['tabular-nums'] }}>
            {displayTime}
          </Text>
        </View>
      </Pressable>

      <View className="flex-row items-center">
        {state === 'working' && (
          <Pressable onPress={onPause} className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-1.5">
            <MaterialIcons name="pause" size={18} color="white" />
          </Pressable>
        )}
        {state === 'paused' && (
          <Pressable onPress={onResume} className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-1.5">
            <MaterialIcons name="play-arrow" size={18} color="white" />
          </Pressable>
        )}
        <Pressable onPress={onStop} className="w-8 h-8 rounded-full bg-white/10 items-center justify-center">
          <MaterialIcons name="close" size={16} color="white" />
        </Pressable>
      </View>
    </View>
  );
};
