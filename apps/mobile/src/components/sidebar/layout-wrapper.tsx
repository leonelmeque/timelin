import React from 'react';
import { View, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from '~/components/ui/text';
import { useResponsive } from '~/hooks/use-responsive';
import { useCustomModal } from '~/context';

type NavItem = {
  path: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  isAction?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/new', icon: 'add', label: 'New Task', isAction: true },
  { path: '/settings', icon: 'settings', label: 'Settings' },
];

function SidebarNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [, dispatch] = useCustomModal();

  return (
    <View className="w-56 bg-bg-secondary border-r border-border py-4 px-2.5">
      <View className="px-2.5 py-1.5 mb-3">
        <Text className="text-base font-bold text-fg">Timelin</Text>
        <Text className="text-2xs text-fg-tertiary">Task Management</Text>
      </View>

      {NAV_ITEMS.map((item) => {
        const isActive = item.path === '/'
          ? pathname === '/' || pathname === ''
          : pathname.startsWith(item.path);

        const onPress = () => {
          if (item.isAction) {
            dispatch(true);
          } else {
            router.push(item.path as any);
          }
        };

        return (
          <Pressable
            key={item.path}
            onPress={onPress}
            className={`flex-row items-center px-2.5 py-1.5 rounded mb-px ${
              isActive ? 'bg-bg-hover' : ''
            } active:bg-bg-hover`}
          >
            <MaterialIcons
              name={item.icon}
              size={16}
              color={isActive ? '#37352F' : '#787774'}
            />
            <Text className={`ml-2 text-sm ${
              isActive ? 'text-fg font-medium' : 'text-fg-secondary'
            }`}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ScreenWithSidebar({ children }: { children: React.ReactNode }) {
  const { showSidebar } = useResponsive();

  if (!showSidebar) {
    return children as React.ReactElement;
  }

  return (
    <View className="flex-row flex-1">
      <SidebarNav />
      <View className="flex-1">{children}</View>
    </View>
  );
}
