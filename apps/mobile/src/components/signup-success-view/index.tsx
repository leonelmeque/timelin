import { FC } from 'react';
import ObjectTopImg from '../../../assets/object-top.svg';
import ObjectBottomImg from '../../../assets/object-bottom.svg';
import { Container } from './styles';
import { Button, Spacer, Text } from '@todo/mobile-ui';
import { View } from 'react-native';

type SignupSuccessProps = {
  onContinue: () => void;
};

export const SignupSuccessView: FC<SignupSuccessProps> = ({ onContinue }) => {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ObjectTopImg />
        <Spacer size="16" />
        <Text size="heading" weight="bold">
          Welcome to timelin
        </Text>
        <Text size="body">You have successfully signed up!</Text>
        <Spacer size="16" />
        <ObjectBottomImg />
      </View>
      <Button
        onPress={onContinue}
        variant="primary"
        size="lg"
        label="Continue"
      />
    </Container>
  );
};
