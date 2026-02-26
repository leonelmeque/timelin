import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type ViewMode = 'stack' | 'kanban';

type Props = {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
};

export const ViewModeToggle: React.FC<Props> = ({ mode, onChange }) => (
  <View className="flex-row bg-white/10 rounded-lg p-0.5">
    <Pressable
      onPress={() => onChange('stack')}
      className={`w-8 h-8 rounded items-center justify-center ${mode === 'stack' ? 'bg-white/20' : ''}`}
    >
      <MaterialIcons name="view-agenda" size={16} color={mode === 'stack' ? '#fff' : '#9CA3AF'} />
    </Pressable>
    <Pressable
      onPress={() => onChange('kanban')}
      className={`w-8 h-8 rounded items-center justify-center ${mode === 'kanban' ? 'bg-white/20' : ''}`}
    >
      <MaterialIcons name="view-column" size={16} color={mode === 'kanban' ? '#fff' : '#9CA3AF'} />
    </Pressable>
  </View>
);
