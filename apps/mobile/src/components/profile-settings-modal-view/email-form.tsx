import { FC } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { FormInput } from '@/components/form-input';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { validateEmail } from '../../lib/utils';

type EmailFormValues = {
  currentEmail: string;
  newEmail: string;
  confirmEmail: string;
};

export const EmailForm: FC<{
  email: string;
  onSubmit?: (value: string) => void;
}> = ({ onSubmit, email }) => {
  const validation: ValidationFunction<EmailFormValues> = (values) => {
    const newErrors: ValidationErrors<EmailFormValues> = {};

    if (!validateEmail(values.newEmail)) {
      newErrors.newEmail = 'Invalid email';
    }

    if (values.newEmail === values.currentEmail) {
      newErrors.newEmail = 'Cannot be the same as current email';
    }

    if (values.newEmail) {
      if (values.newEmail !== values.confirmEmail) {
        newErrors.confirmEmail = 'Emails do not match';
      }
    }

    return newErrors;
  };

  const {
    values,
    handleChange: onFormChange,
    errors,
  } = useForm(
    { currentEmail: email, newEmail: '', confirmEmail: '' },
    validation
  );

  return (
    <>
      <FormInput
        label="Current email"
        placeholder="mail@domain.com"
        value={values.currentEmail}
        onChangeText={onFormChange('currentEmail')}
        variant={errors.currentEmail ? 'error' : 'caption'}
        errorText={errors.currentEmail}
        disabled
      />
      <View className="h-4" />
      <FormInput
        label="New email"
        placeholder="johndoejunior@domain.com"
        value={values.newEmail}
        onChangeText={onFormChange('newEmail')}
        variant={errors.newEmail ? 'error' : 'caption'}
        errorText={errors.newEmail}
        autoCapitalize="none"
      />
      <View className="h-4" />
      <FormInput
        label="Confirm email"
        placeholder="Same as new email"
        value={values.confirmEmail}
        onChangeText={onFormChange('confirmEmail')}
        variant={errors.confirmEmail ? 'error' : 'caption'}
        errorText={errors.confirmEmail}
        autoCapitalize="none"
      />
      <View className="h-32" />
      <Button
        variant="default"
        size="lg"
        onPress={() => onSubmit && onSubmit(values.newEmail)}
        disabled={!!(errors.newEmail || errors.confirmEmail)}
      >
        <Text>Change email address</Text>
      </Button>
    </>
  );
};
