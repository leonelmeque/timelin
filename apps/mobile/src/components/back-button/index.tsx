import { MaterialIcons } from '@expo/vector-icons';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { FC } from 'react';
import { cn } from '@/lib/cn';

type BackButtonProps = {
  colour: string;
  onPress: (e: GestureResponderEvent) => void;
  text: string;
};

export const LeftArrowWithTextButton: FC<BackButtonProps> = ({
  onPress,
  colour,
  text,
}) => (
  <Pressable onPress={onPress} className={cn('items-center flex-row')}>
    <MaterialIcons name="arrow-back" size={24} color={colour} />
    <View className="w-2" />
    <Text className="font-bold" style={{ color: colour }}>
      {text}
    </Text>
  </Pressable>
);
