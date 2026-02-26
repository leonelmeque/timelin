import { useState } from 'react';

export type ValidationErrors<T> = {
  [key in keyof T]?: string;
};

export type ValidationFunction<T extends {}> = (
  values: T
) => ValidationErrors<T>;

export const useForm = <P extends {}>(
  initialValues: P,
  validation?: ValidationFunction<P>
) => {
  const [values, setValues] = useState<P>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<P>>({});

  const handleChange = (name: string) => <V extends unknown>(value: V) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    if (!validation) return;

    const validationErrors = validation({ ...values, [name]: value });
    const hasErrors = Object.keys(validationErrors).length;

    if (hasErrors !== 0) {
      setErrors(validationErrors);
    } else if (hasErrors === 0 && Object.keys(errors).length !== 0) {
      setErrors(validationErrors);
    }
  };

  return {
    values,
    errors,
    handleChange,
  } as const;
};
