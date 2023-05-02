import { useState } from 'react';

export const useForm = () => {
  const [form, setForm] = useState<{ [key: string]: any }>({});

  const onFormChange = ({ name, value }: { name: string; value: string }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return {
    form,
    onFormChange,
  };
};
