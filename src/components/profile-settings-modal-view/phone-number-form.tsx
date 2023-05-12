import { FC } from 'react';
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from '../../hooks/use-form';

type PhoneNumberFormProps = {
  countryCode: string;
  number: string;
};

type PhoneNumberForm = {
  countryCode: string;
  number: string;
};

export const PhoneNumberForm: FC<PhoneNumberFormProps> = (props) => {
  const validation: ValidationFunction<PhoneNumberForm> = (values) => {
    const newErrors: ValidationErrors<PhoneNumberForm> = {};

    if (values.countryCode.length === 0) {
      newErrors.countryCode = 'Country code is required';
    }

    if (values.number.length === 0) {
      newErrors.number = 'Number is required';
    }

    return newErrors;
  };

  const {
    values: { countryCode, number },
    errors,
    handleChange: onFormChange,
  } = useForm({ ...props }, validation);


  // create a phone input component to finalize this

  return <></>;
};
