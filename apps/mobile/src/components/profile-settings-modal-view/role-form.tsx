import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FormInput } from '@/components/form-input';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';
import { useRouter } from 'expo-router';

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

  const router = useRouter();

  const handleUpdateFormField = () => {
    console.log({ role });
    router.back();
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
        variant="default"
        size="lg"
        onPress={handleUpdateFormField}
      >
        <Text>Update role</Text>
      </Button>
    </>
  );
};
