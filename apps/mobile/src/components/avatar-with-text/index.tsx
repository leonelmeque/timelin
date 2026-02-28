import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { cn } from '@/lib/cn';

type AvatarWithTextProps = {
  name: string;
  role: string;
  profilePicture?: string;
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: '#15141a',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export const AvatarWithText: FC<AvatarWithTextProps> = ({
  name,
  role,
  profilePicture = 'https://picsum.photos/200',
}) => {
  return (
    <View testID='component.avatar-with-text' className={cn('flex-row')}>
      <View style={styles.boxShadow}>
        <Avatar
          alt="user"
          style={{ width: 48, height: 48, borderRadius: 4 }}
        >
          <AvatarImage source={{ uri: profilePicture, cache: 'force-cache' }} />
        </Avatar>
      </View>
      <View className="w-4" />
      <View className={cn('justify-center content-center')}>
        <Text className="font-bold">
          {name}
        </Text>
        <Text className="text-sm text-grey-100">
          {role}
        </Text>
      </View>
    </View>
  );
};
