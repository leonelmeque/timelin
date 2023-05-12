import { FC } from 'react';
import { Button } from '../../ui/atoms';
import { FormInput } from '../../ui/molecules';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { useNavigation } from '@react-navigation/native';

type RoleForm = {
  role: string;
};

export const RoleForm: FC<RoleForm> = (props) => {
  const validation: ValidationFunction<typeof props> = (values) => {
    const newErrors: ValidationErrors<typeof props> = {};

    if (values.role.length < 1) {
      newErrors.role = 'Please add a role, E.g Product Designer';
    }

    return newErrors;
  };

  const {
    values: { role },
    errors,
    handleChange: onFormChange,
  } = useForm(props, validation);

  const navigation = useNavigation();

  const handleUpdateFormField = () => {
    console.log({ role });
    navigation.goBack();
  };

  return (
    <>
      <FormInput
        label="Role"
        value={role}
        onChangeText={onFormChange('role')}
        variant={errors?.role ? 'error' : 'caption'}
        errorText={errors.role}
      />
      <Button
        label="Update role"
        variant="primary"
        size="lg"
        onPress={handleUpdateFormField}
      />
    </>
  );
};
