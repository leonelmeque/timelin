import { Button, Spacer } from '../../ui/atoms';
import { FormInput } from '../../ui/molecules';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';

type ProfileFullNameFormProps = {
  firstName: string;
  lastName: string;
};

export const ProfileFullNameForm: FC<ProfileFullNameFormProps> = (props) => {
  const initialValues = props;

  const validation: ValidationFunction<typeof initialValues> = (values) => {
    const newErrors: ValidationErrors<typeof initialValues> = {};

    const { firstName, lastName } = values;

    if (firstName.length < 2) {
      newErrors.firstName = 'Name cannot be less than two characters';
    }

    if (lastName.length < 2) {
      newErrors.lastName = 'Last name should not have less than two characters';
    }

    return newErrors;
  };

  const {
    values: { firstName, lastName },
    handleChange: onFormChange,
    errors,
  } = useForm(
    {
      ...initialValues,
    },
    validation
  );

  const navigation = useNavigation();

  const handleUpdateInformation = () => {
    console.log({
      firstName,
      lastName,
    });

    navigation.goBack();
  };

  return (
    <>
      <FormInput
        label="First Name"
        placeholder="First Name"
        value={firstName}
        onChangeText={onFormChange('firstName')}
        maxLength={42}
        variant={errors?.firstName ? 'error' : 'caption'}
        errorText={errors.firstName}
      />
      <Spacer size="8" />
      <FormInput
        label="Last name"
        placeholder="Last Name"
        value={lastName}
        onChangeText={onFormChange('lastName')}
        maxLength={42}
        variant={errors?.lastName ? 'error' : 'caption'}
        errorText={errors.lastName}
      />
      <Spacer size="64" />
      <Button
        label="Update"
        variant="primary"
        size="lg"
        onPress={handleUpdateInformation}
      />
    </>
  );
};
