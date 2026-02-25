import React from 'react';
import { View, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RetroSummary } from '../../lib/shared-types';
import { Text } from '~/components/ui/text';
import { Card, CardContent } from '~/components/ui/card';

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
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
      <Text className="text-2xl font-bold text-gray-900">{title}</Text>
      <View className="h-4" />

      {/* Stat cards */}
      <View className="flex-row -mx-1">
        <View className="flex-1 mx-1">
          <Card className="bg-primary-50 border-0">
            <CardContent>
              <MaterialIcons name="timer" size={24} color="#3D3868" />
              <View className="h-1" />
              <Text className="text-2xl font-bold text-primary-500">{summary.totalPomodoros}</Text>
              <Text className="text-xs text-primary-400">Pomodoros</Text>
            </CardContent>
          </Card>
        </View>
        <View className="flex-1 mx-1">
          <Card className="bg-primary-50 border-0">
            <CardContent>
              <MaterialIcons name="work" size={24} color="#3D3868" />
              <View className="h-1" />
              <Text className="text-2xl font-bold text-primary-500">{formatMinutes(summary.totalWorkMinutes)}</Text>
              <Text className="text-xs text-primary-400">Focus Time</Text>
            </CardContent>
          </Card>
        </View>
      </View>

      <View className="h-2" />

      <View className="flex-row -mx-1">
        <View className="flex-1 mx-1">
          <Card className="bg-success-50 border-0">
            <CardContent>
              <MaterialIcons name="free-breakfast" size={24} color="#386d36" />
              <View className="h-1" />
              <Text className="text-2xl font-bold text-success-500">{formatMinutes(summary.totalBreakMinutes)}</Text>
              <Text className="text-xs text-success-400">Break Time</Text>
            </CardContent>
          </Card>
        </View>
        <View className="flex-1 mx-1">
          <Card className="bg-warning-50 border-0">
            <CardContent>
              <MaterialIcons name="edit" size={24} color="#84712e" />
              <View className="h-1" />
              <Text className="text-2xl font-bold text-warning-500">{summary.totalUpdates}</Text>
              <Text className="text-xs text-warning-400">Updates</Text>
            </CardContent>
          </Card>
        </View>
      </View>

      <View className="h-6" />
      <Text className="text-lg font-bold text-gray-900">Timeline</Text>
      <View className="h-2" />

      {allItems.length === 0 ? (
        <Text className="text-base text-gray-400">No activity recorded yet</Text>
      ) : (
        allItems.map((item, idx) => (
          <View key={idx} className="flex-row py-3 border-b border-gray-100">
            <View
              className={`w-2.5 h-2.5 rounded-full mt-1 mr-3 ${
                item.kind === 'pomodoro'
                  ? (item.data as any).type === 'work' ? 'bg-primary-500' : 'bg-success-500'
                  : 'bg-warning-500'
              }`}
            />
            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-900">
                {item.kind === 'pomodoro'
                  ? `${(item.data as any).type === 'work' ? '🍅 Pomodoro' : '☕ Break'} — ${(item.data as any).durationMinutes}min${(item.data as any).completed ? '' : ' (cancelled)'}`
                  : (item.data as any).title
                }
              </Text>
              {item.kind === 'event' && (item.data as any).description && (
                <Text className="text-sm text-gray-400 mt-0.5">{(item.data as any).description}</Text>
              )}
              <Text className="text-xs text-gray-400 mt-1">{formatDate(item.timestamp)}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};
