import { FC } from 'react';
import ObjectTopImg from '../../../assets/object-top.svg';
import ObjectBottomImg from '../../../assets/object-bottom.svg';
import { Container } from './styles';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type SignupSuccessProps = {
  onContinue: () => void;
};

export const SignupSuccessView: FC<SignupSuccessProps> = ({ onContinue }) => {
  return (
    <Container>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ObjectTopImg />
        <View className="h-8" />
        <Text className="text-2xl font-bold tracking-tight">
          Welcome to timelin
        </Text>
        <Text>You have successfully signed up!</Text>
        <View className="h-8" />
        <ObjectBottomImg />
      </View>
      <Button
        onPress={onContinue}
        variant="default"
        size="lg"
      >
        <Text>Continue</Text>
      </Button>
    </Container>
  );
};
