import React from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { usePomodoro, PomodoroState } from './use-pomodoro';
import { Text, Spacer } from '../../ui/atoms';

const COLORS = {
  primary: '#3D3868',
  primaryLight: '#F0EFF7',
  success: '#386d36',
  successLight: '#eff7ee',
  warning: '#84712e',
  warningLight: '#fbf8ed',
  danger: '#842e39',
  dangerLight: '#fbedef',
  grey: '#77777a',
  greyLight: '#e8e8e8',
  greyDark: '#3d3c41',
  white: '#FFFFFF',
  bg: '#F8F8FB',
};

const Container = styled.View`
  padding: 16px;
  border-radius: 16px;
  background-color: ${COLORS.bg};
`;

const TimerDisplay = styled.View`
  align-items: center;
  justify-content: center;
  padding: 24px 0;
`;

const Controls = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProgressBarOuter = styled.View`
  height: 4px;
  border-radius: 2px;
  background-color: ${COLORS.greyLight};
  overflow: hidden;
  margin: 0 16px;
`;

const SessionDots = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 8px;
`;

function getStateLabel(state: PomodoroState): string {
  switch (state) {
    case 'working': return 'FOCUS TIME';
    case 'break': return 'BREAK TIME';
    case 'paused': return 'PAUSED';
    case 'idle': return 'READY TO FOCUS';
  }
}

function getColor(state: PomodoroState): string {
  switch (state) {
    case 'working': return COLORS.primary;
    case 'break': return COLORS.success;
    case 'paused': return COLORS.warning;
    default: return COLORS.grey;
  }
}

type Props = {
  todoId: string;
};

export const PomodoroTimer: React.FC<Props> = ({ todoId }) => {
  const {
    state,
    displayTime,
    progress,
    sessionCount,
    startWork,
    pause,
    resume,
    stop,
    skip,
  } = usePomodoro(todoId);

  const color = getColor(state);

  return (
    <Container>
      <TimerDisplay>
        <Text size="small" weight="bold" style={{ color, letterSpacing: 2 }}>
          {getStateLabel(state)}
        </Text>
        <Spacer size="4" />
        <Text size="large" weight="bold" style={{ fontSize: 48, color, fontVariant: ['tabular-nums'] }}>
          {displayTime}
        </Text>
      </TimerDisplay>

      <ProgressBarOuter>
        <View style={{
          height: '100%',
          width: `${Math.min(progress * 100, 100)}%`,
          backgroundColor: color,
          borderRadius: 2,
        }} />
      </ProgressBarOuter>

      <SessionDots>
        {Array.from({ length: 4 }).map((_, i) => (
          <View key={i} style={{
            width: 8, height: 8, borderRadius: 4, marginHorizontal: 3,
            backgroundColor: i < (sessionCount % 4) ? COLORS.primary : COLORS.greyLight,
          }} />
        ))}
      </SessionDots>

      <Spacer size="16" />

      <Controls>
        {state === 'idle' && (
          <Pressable onPress={startWork} style={{
            width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <MaterialIcons name="play-arrow" size={32} color={COLORS.white} />
          </Pressable>
        )}

        {state === 'working' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={stop} style={{
              width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.dangerLight,
              alignItems: 'center', justifyContent: 'center', marginRight: 16,
            }}>
              <MaterialIcons name="stop" size={24} color={COLORS.danger} />
            </Pressable>
            <Pressable onPress={pause} style={{
              width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.warning,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MaterialIcons name="pause" size={32} color={COLORS.white} />
            </Pressable>
          </View>
        )}

        {state === 'paused' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={stop} style={{
              width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.dangerLight,
              alignItems: 'center', justifyContent: 'center', marginRight: 16,
            }}>
              <MaterialIcons name="stop" size={24} color={COLORS.danger} />
            </Pressable>
            <Pressable onPress={resume} style={{
              width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.primary,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MaterialIcons name="play-arrow" size={32} color={COLORS.white} />
            </Pressable>
          </View>
        )}

        {state === 'break' && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={skip} style={{
              width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.greyLight,
              alignItems: 'center', justifyContent: 'center', marginRight: 16,
            }}>
              <MaterialIcons name="skip-next" size={24} color={COLORS.greyDark} />
            </Pressable>
            <View style={{
              width: 64, height: 64, borderRadius: 32, backgroundColor: COLORS.success,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MaterialIcons name="free-breakfast" size={32} color={COLORS.white} />
            </View>
          </View>
        )}
      </Controls>

      <Spacer size="8" />
      <View style={{ alignItems: 'center' }}>
        <Text size="small" weight="regular" style={{ color: COLORS.grey }}>
          {sessionCount} pomodoro{sessionCount !== 1 ? 's' : ''} completed
        </Text>
      </View>
    </Container>
  );
};
