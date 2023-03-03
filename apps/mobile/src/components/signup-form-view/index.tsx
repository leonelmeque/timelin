import { FC, useRef, useState } from 'react';
import { formValidators, tokens, User } from '@todo/commons';
import { Box, Button, FormInput, Spacer, Text } from '@todo/mobile-ui';
import { TouchableWithoutFeedback } from 'react-native';

interface SignupFormViewProps {
  onSubmit: (data: UserFormProps) => void;
  goToLogin: () => void;
}

interface UserFormProps extends User {
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupFormView: FC<SignupFormViewProps> = ({
  onSubmit,
  goToLogin,
}) => {
  const [state, setState] = useState<Partial<UserFormProps>>({});
  const [errors, setErrors] = useState<Partial<UserFormProps>>({});
  const timerRef = useRef<any>(null);

  const handleChange = (key: keyof Partial<UserFormProps>, value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      validateWhileTyping(key);
    }, 1000);

    setState({ ...state, [key]: value });
  };

  const validateWhileTyping = (key: keyof Partial<UserFormProps>) => {
    switch (key) {
      case 'email': {
        if (!formValidators.validateEmail(state.email as string)) {
          setErrors({ ...errors, email: 'Email is not valid' });
        } else {
          setErrors({ ...errors, email: undefined });
        }
      }
      case 'username': {
        if (!formValidators.validateUsername(state.username as string)) {
          setErrors({ ...errors, username: 'Username is not valid' });
        } else {
          setErrors({ ...errors, username: undefined });
        }
      }

      case 'password': {
        if (!formValidators.validateCommonPassword(state.password as string)) {
          setErrors({ ...errors, password: 'Password is not valid' });
        } else {
          setErrors({ ...errors, password: undefined });
        }
      }

      case 'confirmPassword': {
        if (
          !formValidators.validatePassword(
            state.password as string,
            state.confirmPassword as string
          )
        ) {
          setErrors({ ...errors, confirmPassword: 'Password is not valid' });
        } else {
          setErrors({ ...errors, confirmPassword: undefined });
        }
      }
      default: {
        return;
      }
    }
  };

  const validateForm = () => {
    const newErrors = {} as Partial<UserFormProps>;

    if (!state.email) {
      newErrors.email = 'Email is required';
    }

    if (!state.username) {
      newErrors.username = 'Username is required';
    }

    if (!state.password) {
      newErrors.password = 'Password is required';
    }

    if (!state.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    }

    if (!formValidators.validateUsername(state.username as string)) {
      newErrors.username = 'Username is not valid';
    }

    if (!formValidators.validateEmail(state.email as string) && state.email) {
      newErrors.email = 'Email is not valid';
    }

    if (
      !formValidators.validatePassword(
        state.password as string,
        state.confirmPassword as string
      )
    ) {
      newErrors.confirmPassword = 'Password does not match the previous one';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitAfterValidation = () => {
    if (validateForm()) onSubmit(state as UserFormProps);
  };

  return (
    <Box>
      <FormInput
        placeholder="mail@domain.com"
        value={state.email}
        onChangeText={(value) => handleChange('email', value)}
        autoCapitalize="none"
        label="Email"
        errorText={errors.email}
        variant={!errors.email ? 'caption' : 'error'}
        captionText={
          errors.email
            ? 'Enter your email address'
            : 'Your email address is valid'
        }
      />
      <Spacer size="8" />
      <FormInput
        label="Username"
        placeholder="jhon.doe.123"
        value={state.username}
        autoCapitalize="none"
        onChangeText={(value) => handleChange('username', value)}
        errorText={errors.username}
        captionText="Choose a username that is at least 3 characters long."
        variant={!errors.username ? 'caption' : 'error'}
      />
      <Spacer size="8" />
      <FormInput
        label="Password"
        placeholder="o%42pe"
        value={state.password}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={(value) => handleChange('password', value)}
        errorText={errors.password}
        variant={!errors.password ? 'caption' : 'error'}
        captionText="User passwords must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter."
      />
      <Spacer size="8" />
      <FormInput
        label="Confirm Password"
        value={state.confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(value) => handleChange('confirmPassword', value)}
        errorText={errors.confirmPassword}
        variant={!errors.confirmPassword ? 'caption' : 'error'}
        captionText="Use the same password as before, for verification."
      />
      <Spacer size="16" />
      <Button
        label="Create account"
        size="lg"
        variant="primary"
        onPress={handleSubmitAfterValidation}
      />
      <Spacer size="8" />
      <Text
        size="body"
        colour={tokens.colours.light.greys.G200}
        style={{ textAlign: 'center' }}
      >
        Already have an account?{' '}
        <TouchableWithoutFeedback onPress={() => goToLogin()}>
          <Text
            size="body"
            colour={tokens.colours.light.primary.P300}
            weight="bold"
          >
            Login
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </Box>
  );
};
