import { FC } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

type TextLabelPresentationProps = {
  label: string;
  value?: string;
  className?: string;
};

export const TextLabelPresentation: FC<TextLabelPresentationProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <View className={cn('gap-1 rounded-lg bg-grey-50/20 p-4', className)}>
      <Text className="text-sm">{label}</Text>
      <Text className="text-base font-bold text-grey-75">{value}</Text>
    </View>
  );
};

TextLabelPresentation.displayName = 'TextLabelPresentation';
