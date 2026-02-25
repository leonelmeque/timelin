import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { RetroView } from '../../components/retro-view';
import { Header } from '../../ui/organisms';
import { Text, Spacer } from '../../ui/atoms';
import { RetroSummary, api } from '../../lib';

type RetroScreenParams = {
  Params: {
    todoId?: string;
    todoName?: string;
    period?: 'day' | 'week' | 'month';
  };
};

const TabBar = styled.View`
  flex-direction: row;
  padding: 8px 16px;
`;

const Tab = styled(Pressable)<{ active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 8px;
  background-color: ${(props) => props.active ? '#3D3868' : '#F0EFF7'};
`;

const TabText = styled(Text)<{ active: boolean }>`
  color: ${(props) => props.active ? '#FFFFFF' : '#3D3868'};
`;

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="arrow-back" size={24} />
              <Spacer size="4" />
              <Text size="body" weight="medium">Back</Text>
            </View>
          </Pressable>
        )}
        renderRigthContent={() => null}
      />

      <TabBar>
        {periods.map(({ key, label }) => (
          <Tab key={key} active={activePeriod === key} onPress={() => setActivePeriod(key)}>
            <TabText size="small" weight="bold" active={activePeriod === key}>
              {label}
            </TabText>
          </Tab>
        ))}
      </TabBar>

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text size="body" weight="regular">Loading...</Text>
        </View>
      ) : summary ? (
        <RetroView summary={summary} title={getTitle()} />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text size="body" weight="regular">No data available</Text>
        </View>
      )}
    </CustomSafeAreaView>
  );
};
