import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FormInput } from '@/components/form-input';
import { FC } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';

type ProfileFullNameFormProps = {
  fullName: string;
  onSubmit?: (values: string) => void;
};

export const ProfileFullNameForm: FC<ProfileFullNameFormProps> = ({
  onSubmit,
  ...rest
}) => {
  const validation: ValidationFunction<typeof rest> = (values) => {
    const newErrors: ValidationErrors<typeof rest> = {};

    const { fullName } = values;

    if (fullName?.length < 2) {
      newErrors.fullName = 'Name cannot be less than two characters';
    }

    return newErrors;
  };

  const {
    values: { fullName },
    handleChange: onFormChange,
    errors,
  } = useForm({ fullName: rest.fullName }, validation);

  return (
    <>
      <FormInput
        label="First Name"
        placeholder="First Name"
        value={fullName}
        onChangeText={onFormChange('fullName')}
        maxLength={42}
        variant={errors?.fullName ? 'error' : 'caption'}
        errorText={errors.fullName}
      />

      <View className="h-32" />
      <Button
        variant="default"
        size="lg"
        onPress={() => {
          onSubmit && onSubmit(fullName);
        }}
      >
        <Text>Update</Text>
      </Button>
    </>
  );
};
