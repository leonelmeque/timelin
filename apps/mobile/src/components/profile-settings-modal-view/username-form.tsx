import { FC } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { validateUsername } from '../../lib/utils';
import { FormInput } from '@/components/form-input';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';

type UsernameForm = {
  username: string;
  onSubmit: (values: string) => void;
};

type UsernameFormProps = {
  currentUsername: string;
  newUsername: string;
};

export const UsernameForm: FC<UsernameForm> = ({ username, onSubmit }) => {
  const validation: ValidationFunction<UsernameFormProps> = (values) => {
    const newErrors: ValidationErrors<UsernameFormProps> = {};
    const { currentUsername, newUsername } = values;

    if (currentUsername === newUsername) {
      newErrors.newUsername =
        'New username should not be the same as previous.';
    }

    if (!validateUsername(values.newUsername)) {
      newErrors.newUsername = 'Username is not valid';
    }

    if (!newUsername.length) {
      newErrors.newUsername = 'This field cannot be empty';
    }

    return newErrors;
  };

  const {
    values: { currentUsername, newUsername },
    handleChange: onFormChange,
    errors,
  } = useForm<UsernameFormProps>(
    { currentUsername: username, newUsername: '' },
    validation
  );

  const router = useRouter();

  const handleUpdateInformation = () => {
    console.log({ username });
    router.back();
  };

  return (
    <>
      <FormInput
        label="Current username"
        value={currentUsername}
        placeholder="What would you like to be called?"
        disabled
        errorText={errors.currentUsername}
        onChangeText={onFormChange('currentUsername')}
        autoCapitalize="none"
      />
      <View className="h-4" />
      <FormInput
        label="New username"
        value={newUsername}
        placeholder="What would you like to be called next?"
        variant={errors.newUsername ? 'error' : 'caption'}
        errorText={errors.newUsername}
        onChangeText={onFormChange('newUsername')}
        autoCapitalize="none"
      />
      <View className="h-32" />
      <Button
        variant="default"
        size="lg"
        onPress={() => {
          onSubmit(newUsername);
        }}
      >
        <Text>Update username</Text>
      </Button>
    </>
  );
};
