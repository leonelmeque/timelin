import React from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RetroSummary, TimelineEventType } from '../../lib/shared-types';
import { Text, Spacer } from '../../ui/atoms';

const COLORS = {
  primary: '#3D3868',
  primaryLight: '#F0EFF7',
  success: '#386d36',
  successLight: '#eff7ee',
  warning: '#84712e',
  warningLight: '#fbf8ed',
  danger: '#842e39',
  white: '#FFFFFF',
  grey: '#77777a',
  greyLight: '#e8e8e8',
  bg: '#F8F8FB',
};

const StatCard = styled.View<{ bg: string }>`
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  background-color: ${(props) => props.bg};
  margin: 4px;
`;

const StatRow = styled.View`
  flex-direction: row;
  margin: 0 -4px;
`;

const TimelineItem = styled.View`
  flex-direction: row;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.greyLight};
`;

const TimelineDot = styled.View<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  margin-top: 4px;
  margin-right: 12px;
`;

const TimelineContent = styled.View`
  flex: 1;
`;

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatDate(timestamp: string | number): string {
  const d = new Date(timestamp);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getEventColor(type?: TimelineEventType | string): string {
  switch (type) {
    case 'POMODORO': return COLORS.primary;
    case 'BREAK': return COLORS.success;
    default: return COLORS.warning;
  }
}

function getEventIcon(type?: TimelineEventType | string): string {
  switch (type) {
    case 'POMODORO': return 'timer';
    case 'BREAK': return 'free-breakfast';
    default: return 'edit';
  }
}

type Props = {
  summary: RetroSummary;
  title: string;
};

export const RetroView: React.FC<Props> = ({ summary, title }) => {
  const allItems = [
    ...summary.events.map((e) => ({
      kind: 'event' as const,
      timestamp: new Date(e.timestamp).getTime(),
      data: e,
    })),
    ...summary.pomodoroSessions.map((s) => ({
      kind: 'pomodoro' as const,
      timestamp: new Date(s.startedAt).getTime(),
      data: s,
    })),
  ].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
      <Text size="large" weight="bold">{title}</Text>
      <Spacer size="16" />

      <StatRow>
        <StatCard bg={COLORS.primaryLight}>
          <MaterialIcons name="timer" size={24} color={COLORS.primary} />
          <Spacer size="4" />
          <Text size="large" weight="bold" style={{ color: COLORS.primary }}>
            {summary.totalPomodoros}
          </Text>
          <Text size="small" weight="regular" style={{ color: COLORS.primary }}>
            Pomodoros
          </Text>
        </StatCard>
        <StatCard bg={COLORS.primaryLight}>
          <MaterialIcons name="work" size={24} color={COLORS.primary} />
          <Spacer size="4" />
          <Text size="large" weight="bold" style={{ color: COLORS.primary }}>
            {formatMinutes(summary.totalWorkMinutes)}
          </Text>
          <Text size="small" weight="regular" style={{ color: COLORS.primary }}>
            Focus Time
          </Text>
        </StatCard>
      </StatRow>

      <StatRow>
        <StatCard bg={COLORS.successLight}>
          <MaterialIcons name="free-breakfast" size={24} color={COLORS.success} />
          <Spacer size="4" />
          <Text size="large" weight="bold" style={{ color: COLORS.success }}>
            {formatMinutes(summary.totalBreakMinutes)}
          </Text>
          <Text size="small" weight="regular" style={{ color: COLORS.success }}>
            Break Time
          </Text>
        </StatCard>
        <StatCard bg={COLORS.warningLight}>
          <MaterialIcons name="edit" size={24} color={COLORS.warning} />
          <Spacer size="4" />
          <Text size="large" weight="bold" style={{ color: COLORS.warning }}>
            {summary.totalUpdates}
          </Text>
          <Text size="small" weight="regular" style={{ color: COLORS.warning }}>
            Updates
          </Text>
        </StatCard>
      </StatRow>

      <Spacer size="24" />
      <Text size="body" weight="bold">Timeline</Text>
      <Spacer size="8" />

      {allItems.length === 0 ? (
        <Text size="body" weight="regular" style={{ color: COLORS.grey }}>
          No activity recorded yet
        </Text>
      ) : (
        allItems.map((item, idx) => (
          <TimelineItem key={idx}>
            <TimelineDot color={
              item.kind === 'pomodoro'
                ? (item.data as any).type === 'work' ? COLORS.primary : COLORS.success
                : getEventColor((item.data as any).type)
            } />
            <TimelineContent>
              <Text size="small" weight="bold">
                {item.kind === 'pomodoro'
                  ? `${(item.data as any).type === 'work' ? '🍅 Pomodoro' : '☕ Break'} — ${(item.data as any).durationMinutes}min${(item.data as any).completed ? '' : ' (cancelled)'}`
                  : (item.data as any).title
                }
              </Text>
              {item.kind === 'event' && (item.data as any).description && (
                <Text size="small" weight="regular" style={{ color: COLORS.grey, marginTop: 2 }}>
                  {(item.data as any).description}
                </Text>
              )}
              <Text size="small" weight="regular" style={{ color: COLORS.grey, marginTop: 4 }}>
                {formatDate(item.timestamp)}
              </Text>
            </TimelineContent>
          </TimelineItem>
        ))
      )}
    </ScrollView>
  );
};
