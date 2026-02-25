import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

type NavItem = {
  routeName: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isAdd?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { routeName: 'index', icon: 'home', label: 'Home' },
  { routeName: 'add', icon: 'add', label: 'New Task', isAdd: true },
  { routeName: 'settings', icon: 'settings', label: 'Settings' },
];

export const Sidebar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => (
    <View className="w-60 h-full bg-bg-secondary border-r border-border py-4 px-3">
      <View className="px-3 py-2 mb-4">
        <Text className="text-lg font-bold text-fg">Timelin</Text>
        <Text className="text-2xs text-fg-tertiary">Task Management</Text>
      </View>

      <View className="flex-1">
        {state.routes.map((route, index) => {
          const item = NAV_ITEMS.find((n) => n.routeName === route.name);
          if (!item) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`flex-row items-center px-3 py-2 rounded-md mb-0.5 ${
                isFocused ? 'bg-bg-hover' : ''
              } active:bg-bg-hover`}
            >
              <MaterialIcons
                name={item.icon}
                size={18}
                color={isFocused ? '#37352F' : '#787774'}
              />
              <Text className={`ml-2.5 text-sm ${
                isFocused ? 'text-fg font-medium' : 'text-fg-secondary'
              }`}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
