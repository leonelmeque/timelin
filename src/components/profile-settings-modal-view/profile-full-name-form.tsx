import { Button, Spacer } from '../../ui/atoms';
import { FormInput } from '../../ui/molecules';
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

      <Spacer size="64" />
      <Button
        label="Update"
        variant="primary"
        size="lg"
        onPress={() => {
          onSubmit && onSubmit(fullName);
        }}
      />
    </>
  );
};
