import styled from 'styled-components/native';
import { Avatar, Spacer, Text } from '../../ui/atoms';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { tokens } from '../../ui/tokens';

type AvatarWithTextProps = {
  name: string;
  role: string;
  profilePicture?: string;
};

const Container = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: tokens.colours.dark.greys.G300,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    border: '1px soild green',
  },
});

export const AvatarWithText: FC<AvatarWithTextProps> = ({
  name,
  role,
  profilePicture = 'https://picsum.photos/200',
}) => {
  return (
    <Container>
      <View style={styles.boxShadow}>
        <Avatar
          size={48}
          radius={4}
          source={{ uri: profilePicture }}
        />
      </View>
      <Spacer size="8" />
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Text size="body" weight="bold">
          {name}
        </Text>
        <Text size="small" colour={tokens.colours.dark.greys.G100}>
          {role}
        </Text>
      </View>
    </Container>
  );
};
