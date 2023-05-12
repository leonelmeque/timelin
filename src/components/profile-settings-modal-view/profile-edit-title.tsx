import { FC } from 'react';
import { Text } from '../../ui/atoms';

const headingTitle = {
  name: 'Edit full name',
  username: 'Change username',
  role: 'Change role',
  dateOfBirth: 'Update date of birth',
  email: 'Change email',
  phonenumber: 'Update phone number',
};

export const ProfileEditTitle: FC<{ field: keyof typeof headingTitle }> = ({
  field,
}) => (
  <Text size="heading" weight="bold">
    {headingTitle[field]}
  </Text>
);
