import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type BottomTabBarProps = {
  state: { routes: { key: string; name: string }[]; index: number };
  descriptors: Record<string, { options: { tabBarStyle?: unknown } }>;
  navigation: {
    emit: (e: any) => any;
    navigate: (name: string) => void;
  };
  [key: string]: any;
};

const BOTTOM_OFFSET = Platform.OS === 'web' ? 24 : 34;

type TabDef = {
  routeName: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isAdd?: boolean;
};

const TAB_DEFS: TabDef[] = [
  { routeName: 'index', icon: 'home', label: 'Home' },
  { routeName: 'add', icon: 'add', label: 'New', isAdd: true },
  { routeName: 'settings', icon: 'settings', label: 'Settings' },
];

export const FloatingToolbar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const tabBarStyle = focusedDescriptor.options.tabBarStyle as any;
  const shouldHide = tabBarStyle?.display === 'none';

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: shouldHide ? 140 : 0,
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
      {/* min 48dp height per Material Design, 44pt per Apple HIG */}
      <View className="flex-row items-center justify-center bg-toolbar-bg rounded-full px-2 py-1.5 shadow-lg"
        style={{ minHeight: 64 }}
      >
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
                style={{ minWidth: 56, minHeight: 48 }}
                className="rounded-full bg-toolbar-accent items-center justify-center mx-1 active:opacity-80 active:scale-95 px-4"
                accessibilityRole="button"
                accessibilityLabel="Add todo"
                hitSlop={8}
              >
                <MaterialIcons name="add" size={24} color="#FFFFFF" />
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ minWidth: 48, minHeight: 48 }}
              className={`rounded-full items-center justify-center mx-0.5 active:opacity-70 px-3 ${
                isFocused ? 'bg-toolbar-active' : ''
              }`}
              accessibilityRole="button"
              accessibilityLabel={tab.label}
              hitSlop={8}
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
