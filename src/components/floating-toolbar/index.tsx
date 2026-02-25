import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const BOTTOM_OFFSET = Platform.OS === 'web' ? 24 : 32;

type TabDef = {
  routeName: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  isAdd?: boolean;
};

const TAB_DEFS: TabDef[] = [
  { routeName: 'Todo/Home', icon: 'home' },
  { routeName: 'Todo/Add', icon: 'add', isAdd: true },
  { routeName: 'Todo/Settings', icon: 'settings' },
];

export const FloatingToolbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const tabBarStyle = focusedDescriptor.options.tabBarStyle as any;
  const shouldHide = tabBarStyle?.display === 'none';

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: shouldHide ? 120 : 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  }, [shouldHide]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: BOTTOM_OFFSET,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 100,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View className="flex-row items-center justify-center bg-toolbar-bg rounded-[28px] h-14 px-3 shadow-lg">
        {state.routes.map((route, index) => {
          const tab = TAB_DEFS.find((t) => t.routeName === route.name);
          if (!tab) return null;

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

          if (tab.isAdd) {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                className="w-12 h-10 rounded-[20px] bg-toolbar-accent items-center justify-center mx-1.5 active:opacity-80 active:scale-95"
                accessibilityRole="button"
                accessibilityLabel="Add todo"
              >
                <MaterialIcons name="add" size={26} color="#FFFFFF" />
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`w-12 h-10 rounded-[20px] items-center justify-center mx-0.5 active:opacity-70 ${
                isFocused ? 'bg-toolbar-active' : ''
              }`}
              accessibilityRole="button"
              accessibilityLabel={tab.routeName}
            >
              <MaterialIcons
                name={tab.icon}
                size={22}
                color={isFocused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.45)'}
              />
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
};
