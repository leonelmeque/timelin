import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const PILL_HEIGHT = 56;
const PILL_RADIUS = 28;
const BOTTOM_OFFSET = Platform.OS === 'web' ? 24 : 32;

const COLORS = {
  pill: '#1A1730',
  pillActive: '#2D2952',
  iconActive: '#FFFFFF',
  iconInactive: 'rgba(255, 255, 255, 0.45)',
  addBg: '#645CAA',
  shadow: 'rgba(26, 23, 48, 0.35)',
};

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
      style={[
        styles.wrapper,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <View style={styles.pill}>
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
                style={({ pressed }) => [
                  styles.addBtn,
                  pressed && { opacity: 0.8, transform: [{ scale: 0.93 }] },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Add todo"
              >
                <MaterialIcons name="add" size={26} color={COLORS.iconActive} />
              </Pressable>
            );
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={({ pressed }) => [
                styles.tabBtn,
                isFocused && styles.tabBtnActive,
                pressed && { opacity: 0.7 },
              ]}
              accessibilityRole="button"
              accessibilityLabel={tab.routeName}
            >
              <MaterialIcons
                name={tab.icon}
                size={22}
                color={isFocused ? COLORS.iconActive : COLORS.iconInactive}
              />
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: BOTTOM_OFFSET,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pill,
    borderRadius: PILL_RADIUS,
    height: PILL_HEIGHT,
    paddingHorizontal: 12,
    ...(Platform.OS === 'web'
      ? { boxShadow: `0 8px 32px ${COLORS.shadow}` }
      : {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 16,
          elevation: 16,
        }),
  },
  tabBtn: {
    width: 48,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  tabBtnActive: {
    backgroundColor: COLORS.pillActive,
  },
  addBtn: {
    width: 48,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.addBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
});
