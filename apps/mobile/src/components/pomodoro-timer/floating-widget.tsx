import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text } from '~/components/ui/text';
import { PomodoroPhase } from '~/context/pomodoro-context';

type Props = {
  phase: PomodoroPhase;
  displayTime: string;
  todoId: string;
  todoName: string;
  pomodoroCount: number;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSkipBreak: () => void;
  onTakeBreak: () => void;
};

function getPhaseInfo(phase: PomodoroPhase) {
  switch (phase) {
    case 'working': return { label: 'Focusing', color: '#3D3868', icon: 'timer' as const };
    case 'shortBreak': return { label: 'Short Break', color: '#386d36', icon: 'free-breakfast' as const };
    case 'longBreak': return { label: 'Long Break', color: '#2383E2', icon: 'self-improvement' as const };
    case 'paused': return { label: 'Paused', color: '#84712e', icon: 'pause' as const };
    default: return { label: '', color: '#666', icon: 'timer' as const };
  }
}

export const PomodoroFloatingWidget: React.FC<Props> = ({
  phase, displayTime, todoId, todoName, pomodoroCount,
  onPause, onResume, onStop, onSkipBreak, onTakeBreak,
}) => {
  const router = useRouter();
  const isMobile = Platform.OS !== 'web';

  if (phase === 'idle') return null;

  const { label, color, icon } = getPhaseInfo(phase);
  const isBreak = phase === 'shortBreak' || phase === 'longBreak';
  const isWorking = phase === 'working';
  const isPaused = phase === 'paused';

  return (
    <View
      style={{
        position: 'absolute',
        bottom: isMobile ? 100 : 90,
        left: isMobile ? 16 : undefined,
        right: 16,
        zIndex: 999,
        backgroundColor: color,
        borderRadius: 16,
        padding: 12,
        minWidth: isMobile ? undefined : 220,
        ...(Platform.OS === 'web'
          ? { boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }
          : { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 12 }),
      }}
    >
      {/* Task name */}
      <Pressable onPress={() => router.push(`/todo/${todoId}`)} className="mb-1">
        <Text className="text-xs text-white/60" numberOfLines={1}>{todoName}</Text>
      </Pressable>

      {/* Phase + time */}
      <View className="flex-row items-center">
        <MaterialIcons name={icon} size={18} color="rgba(255,255,255,0.7)" />
        <View className="flex-1 ml-2">
          <Text className="text-sm font-bold text-white" style={{ fontVariant: ['tabular-nums'] }}>
            {label} · {displayTime}
          </Text>
          <Text className="text-2xs text-white/50">
            {pomodoroCount % 4}/4 pomodoros
          </Text>
        </View>

        <View className="flex-row items-center ml-2">
          {isWorking && (
            <>
              <Pressable onPress={onTakeBreak} className="h-7 px-2 rounded-full bg-white/20 items-center justify-center mr-1 flex-row">
                <MaterialIcons name="free-breakfast" size={12} color="white" />
                <Text className="text-2xs text-white font-medium ml-1">Break</Text>
              </Pressable>
              <Pressable onPress={onPause} className="w-7 h-7 rounded-full bg-white/20 items-center justify-center mr-1">
                <MaterialIcons name="pause" size={16} color="white" />
              </Pressable>
            </>
          )}
          {isPaused && (
            <>
              <Pressable onPress={onTakeBreak} className="h-7 px-2 rounded-full bg-white/20 items-center justify-center mr-1 flex-row">
                <MaterialIcons name="free-breakfast" size={12} color="white" />
                <Text className="text-2xs text-white font-medium ml-1">Break</Text>
              </Pressable>
              <Pressable onPress={onResume} className="w-7 h-7 rounded-full bg-white/20 items-center justify-center mr-1">
                <MaterialIcons name="play-arrow" size={16} color="white" />
              </Pressable>
            </>
          )}
          {isBreak && (
            <Pressable onPress={onSkipBreak} className="w-7 h-7 rounded-full bg-white/20 items-center justify-center mr-1">
              <MaterialIcons name="skip-next" size={16} color="white" />
            </Pressable>
          )}
          <Pressable onPress={onStop} className="w-7 h-7 rounded-full bg-white/10 items-center justify-center">
            <MaterialIcons name="close" size={14} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
