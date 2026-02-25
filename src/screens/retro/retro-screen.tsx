import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { RetroView } from '../../components/retro-view';
import { Header } from '../../ui/organisms';
import { Text } from '~/components/ui/text';
import { RetroSummary, api } from '../../lib';

type RetroScreenParams = {
  Params: {
    todoId?: string;
    todoName?: string;
    period?: 'day' | 'week' | 'month';
  };
};

type Period = 'todo' | 'day' | 'week' | 'month';

export const RetroScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<RetroScreenParams>>();
  const [summary, setSummary] = useState<RetroSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState<Period>(
    params?.todoId ? 'todo' : params?.period || 'day'
  );

  const fetchRetro = async (period: Period) => {
    setLoading(true);
    try {
      if (period === 'todo' && params?.todoId) {
        const data = await api.retro.getTodoRetro(params.todoId);
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
      case 'todo': return `Retro: ${params?.todoName || 'Task'}`;
      case 'day': return 'Daily Retrospective';
      case 'week': return 'Weekly Retrospective';
      case 'month': return 'Monthly Retrospective';
    }
  };

  const periods: { key: Period; label: string }[] = params?.todoId
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
          <Pressable onPress={() => navigation.goBack()}>
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
