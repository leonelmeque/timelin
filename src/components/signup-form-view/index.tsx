import { FC, useRef, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { User, tokens } from '../../lib';
import {
  validateEmail,
  validateUsername,
  validateCommonPassword,
  validatePassword,
} from '../../lib/utils';
import { Box, Spacer, Text, Button } from '../../ui/atoms';
import { FormInput } from '../../ui/molecules';

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
  const [isLoading, setIsLoading] = useState(false);

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
        if (!validateEmail(state.email as string)) {
          setErrors({ ...errors, email: 'Email is not valid' });
        } else {
          const { email, ...rest } = errors;
          setErrors({ ...rest });
        }
      }
      case 'username': {
        if (!validateUsername(state.username as string)) {
          setErrors({ ...errors, username: 'Username is not valid' });
        } else {
          const { username, ...rest } = errors;
          setErrors({ ...rest });
        }
      }

      case 'password': {
        if (!validateCommonPassword(state.password as string)) {
          setErrors({ ...errors, password: 'Password is not valid' });
        } else {
          const { password, ...rest } = errors;
          setErrors({ ...rest });
        }
      }

      case 'confirmPassword': {
        if (
          validatePassword(
            state.password as string,
            state.confirmPassword as string
          )
        ) {
          setErrors({ ...errors, confirmPassword: 'Password is not valid' });
        } else {
          const { confirmPassword, ...rest } = errors;
          setErrors({ ...rest });
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

    if (!validateUsername(state.username as string)) {
      newErrors.username = 'Username is not valid';
    }

    if (!validateEmail(state.email as string) && state.email) {
      newErrors.email = 'Email is not valid';
    }

    if (
      validatePassword(
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
    if (validateForm()) {
      setIsLoading(true);
      onSubmit(state as UserFormProps);
      setIsLoading(false);
    }
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
        variant={
          !!Object.keys(errors).length && !isLoading ? 'disabled' : 'primary'
        }
        disabled={!!Object.keys(errors).length && !isLoading}
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
