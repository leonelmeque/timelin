import { useState } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { FormInput } from '../../ui/molecules';
import { Button, Spacer } from '../../ui/atoms';
import { Alert } from 'react-native';
import { useUpdateProfile } from '../../lib/api/users/use-update-profile';
import { useNavigation } from '@react-navigation/native';

type ChangePasswordFormProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePasswordForm = () => {
  const validation: ValidationFunction<ChangePasswordFormProps> = (values) => {
    const newErrors: ValidationErrors<ChangePasswordFormProps> = {};

    if (values.currentPassword === values.newPassword) {
      newErrors.newPassword =
        'New password cannot be the same as the current password';
    }

    if (values.confirmPassword) {
      if (values.newPassword !== values.confirmPassword) {
        newErrors.confirmPassword ===
          'Password should be the same as new password';
      }
    }

    return newErrors;
  };

  const {
    values: { currentPassword, newPassword, confirmPassword },
    handleChange: onFormChange,
    errors,
  } = useForm(
    {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validation
  );

  const { reauthenticatePassword, updatePassword } = useUpdateProfile();
  const navigation = useNavigation();
  const [isCurrentPasswordValid, setCurrentPasswordValid] = useState(false);

  const handleSubmitCurrentPassword = async () => {
    try {
      const data = await reauthenticatePassword(currentPassword);
      if (data.user?.uid) {
        setCurrentPasswordValid(true);
      }
    } catch (err: any) {
      //TODO: implement the error notification api
      if (err.code === 'auth/wrong-password') {
        Alert.alert(err.message);
      }
      console.error(err);
    }
  };

  const handleSubmitNewPassword = async () => {
    try {
      await updatePassword(newPassword);
      navigation.goBack();
    } catch (err) {
      //TODO:implement the error notification api
      console.error(err);
      Alert.alert('Something went wrong');
    }
  };

  return (
    <>
      <Spacer size="24" />
      {!isCurrentPasswordValid && (
        <FormInput
          secureTextEntry
          label="Current password"
          value={currentPassword}
          onChangeText={onFormChange('currentPassword')}
        />
      )}

      {isCurrentPasswordValid && (
        <>
          <FormInput
            secureTextEntry
            label="New password"
            value={newPassword}
            onChangeText={onFormChange('newPassword')}
            captionText={errors.newPassword}
            variant={errors.newPassword ? 'error' : 'caption'}
          />
          <Spacer size="8" />
          <FormInput
            secureTextEntry
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={onFormChange('confirmPassword')}
            captionText={errors.confirmPassword}
            variant={errors.confirmPassword ? 'error' : 'caption'}
          />
        </>
      )}
      <Spacer size="64" />

      {!isCurrentPasswordValid ? (
        <Button
          label="Submit current password"
          variant={currentPassword ? 'primary' : 'disabled'}
          size="lg"
          onPress={handleSubmitCurrentPassword}
        />
      ) : (
        <Button
          label="Update password"
          variant="primary"
          size="lg"
          onPress={handleSubmitNewPassword}
        />
      )}
    </>
  );
};
