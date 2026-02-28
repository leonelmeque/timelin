import { FC, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FormInput } from '@/components/form-input';

interface SignInFormViewProps {
  onSignin: ({ username, password }: LoginProps) => void;
  goToSignup: () => void;
  isLoggingIn?: boolean;
}

type LoginProps = {
  username?: string;
  password?: string;
};

export const SignInFormView: FC<SignInFormViewProps> = ({
  goToSignup,
  onSignin,
  isLoggingIn,
}) => {
  const [state, setState] = useState<LoginProps>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<LoginProps>>({});

  const handleChange = (key: keyof LoginProps, value: string) => {
    setState({ ...state, [key]: value });
  };

  return (
    <>
      <View className={cn("px-4")}>
        <FormInput
          label="Username"
          placeholder='e.g. "john.doe"'
          value={state.username}
          autoCapitalize="none"
          onChangeText={(value) => handleChange('username', value)}
          errorText={errors.username}
          variant={!errors.username ? 'caption' : 'error'}
          captionText={errors.username && 'Username might not be correct'}
        />
        <View className="h-4" />
        <FormInput
          label="Password"
          autoCapitalize="none"
          placeholder='e.g. "**********"'
          secureTextEntry
          value={state.password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <View className="h-8" />
        <Button
          size="lg"
          variant="default"
          disabled={isLoggingIn}
          onPress={() =>
            onSignin({ username: state.username, password: state.password })
          }
        >
          <Text>{isLoggingIn ? "Loading..." : "Login"}</Text>
        </Button>
        <View className="h-4" />
        <Text
          className="text-grey-200 text-center"
        >
          Don't have an account?{' '}
          <TouchableWithoutFeedback onPress={goToSignup}>
            <Text
              className="text-primary-300 font-bold"
            >
              Create account
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    </>
  );
};
