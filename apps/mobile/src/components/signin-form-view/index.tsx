import { tokens } from '@todo/commons';
import { Box, Button, FormInput, Spacer, Text } from '@todo/mobile-ui';
import { FC, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

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
      <Box>
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
        <Spacer size="8" />
        <FormInput
          label="Password"
          autoCapitalize="none"
          placeholder='e.g. "**********"'
          secureTextEntry
          value={state.password}
          onChangeText={(value) => handleChange('password', value)}
        />
        <Spacer size="16" />
        <Button
          label="Login"
          size="lg"
          variant={isLoggingIn ? 'disabled' : 'primary'}
          disabled={isLoggingIn}
          onPress={() =>
            onSignin({ username: state.username, password: state.password })
          }
        />
        <Spacer size="8" />
        <Text
          size="body"
          colour={tokens.colours.light.greys.G200}
          style={{ textAlign: 'center' }}
        >
          Don't have an account?{' '}
          <TouchableWithoutFeedback onPress={goToSignup}>
            <Text
              size="body"
              colour={tokens.colours.light.primary.P300}
              weight="bold"
            >
              Create account
            </Text>
          </TouchableWithoutFeedback>
        </Text>
      </Box>
    </>
  );
};
