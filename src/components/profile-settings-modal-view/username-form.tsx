import { FC } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { validateUsername } from '../../lib/utils';
import { FormInput } from '../../ui/molecules';
import { Button, Spacer } from '../../ui/atoms';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation();

  const handleUpdateInformation = () => {
    console.log({ username });
    navigation.goBack();
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
      <Spacer size="8" />
      <FormInput
        label="New username"
        value={newUsername}
        placeholder="What would you like to be called next?"
        variant={errors.newUsername ? 'error' : 'caption'}
        errorText={errors.newUsername}
        onChangeText={onFormChange('newUsername')}
        autoCapitalize="none"
      />
      <Spacer size="64" />
      <Button
        label="Update username"
        variant="primary"
        size="lg"
        onPress={() => {
          onSubmit(newUsername);
        }}
      />
    </>
  );
};
