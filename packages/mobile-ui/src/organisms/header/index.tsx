import { FC } from 'react';
import { PressableProps, View } from 'react-native';
import { Palette } from '../../atoms/palette';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import { Avatar } from '../../atoms/avatar';
import { Container, FunnyBadge } from './styles';
import { tokens } from '@todo/commons';

interface HeaderProps extends PressableProps {
  /**
   * URL link users profile
   */
  avatarURI?: string;
}

export const Header: FC<HeaderProps> = ({ avatarURI, ...rest }) => {
  return (
    <Container {...rest}>
      <View>
        <Text size="large" weight="bold" colour={Palette.neutrals.white}>
          Your Tasks
        </Text>
        <Spacer size="4" />
        <Text size="small" weight="bold" colour={Palette.neutrals.white}>
          👋🏾 Hello user
        </Text>
      </View>
      <View>
        <Avatar
          size={tokens.sizes.large}
          radius={'full'}
          source={{
            uri: avatarURI
              ? avatarURI
              : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
          }}
        />
      </View>
    </Container>
  );
};

Header.displayName = 'Header';
