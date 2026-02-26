import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { RetroView } from '../../components/retro-view';
import { Header } from '../../ui/organisms';
import { RetroSummary, api } from '../../lib';

type Period = 'todo' | 'day' | 'week' | 'month';

export const RetroScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; name?: string }>();
  const todoId = params.id;
  const todoName = params.name;
  const [summary, setSummary] = useState<RetroSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState<Period>(
    todoId ? 'todo' : 'day'
  );

  const fetchRetro = async (period: Period) => {
    setLoading(true);
    try {
      if (period === 'todo' && todoId) {
        const data = await api.retro.getTodoRetro(todoId);
        setSummary(data);
      } else if (period !== 'todo') {
        const data = await api.retro.getPeriodRetro(period);
        setSummary(data);
      }
    } catch (err) {
      console.error('Failed to fetch retro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetro(activePeriod);
  }, [activePeriod]);

  const getTitle = () => {
    switch (activePeriod) {
      case 'todo': return `Retro: ${todoName || 'Task'}`;
      case 'day': return 'Daily Retrospective';
      case 'week': return 'Weekly Retrospective';
      case 'month': return 'Monthly Retrospective';
      default: return 'Retrospective';
    }
  };

  const periods: { key: Period; label: string }[] = todoId
    ? [
        { key: 'todo', label: 'Task' },
        { key: 'day', label: 'Day' },
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
      ]
    : [
        { key: 'day', label: 'Day' },
        { key: 'week', label: 'Week' },
        { key: 'month', label: 'Month' },
      ];

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => router.back()}>
            <View className="flex-row items-center">
              <MaterialIcons name="arrow-back" size={24} />
              <View className="w-1" />
              <Text className="text-base font-medium">Back</Text>
            </View>
          </Pressable>
        )}
        renderRigthContent={() => null}
      />

      <View className="flex-row px-4 py-2">
        {periods.map(({ key, label }) => (
          <Pressable
            key={key}
            onPress={() => setActivePeriod(key)}
            className={`px-4 py-2 rounded-full mr-2 ${
              activePeriod === key ? 'bg-primary-500' : 'bg-primary-50'
            }`}
          >
            <Text className={`text-sm font-bold ${
              activePeriod === key ? 'text-white' : 'text-primary-500'
            }`}>
              {label}
            </Text>
          </Pressable>
        ))}
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-400">Loading...</Text>
        </View>
      ) : summary ? (
        <RetroView summary={summary} title={getTitle()} />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-base text-gray-400">No data available</Text>
        </View>
      )}
    </CustomSafeAreaView>
  );
};
