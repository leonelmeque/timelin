import { FC } from 'react';
import { ProfileFullNameForm } from './profile-full-name-form';
import { UsernameForm } from './username-form';
import { RoleForm } from './role-form';
import { DateOfBirthForm } from './date-of-birth-form';
import { EmailForm } from './email-form';
import { PhoneNumberForm } from './phone-number-form';

export const ProfileEditFormFields: FC<{ field: string }> = ({ field }) => {
  switch (field) {
    case 'name':
      return <ProfileFullNameForm firstName="Jhon" lastName="Doe" />;
    case 'username':
      return <UsernameForm username="jhondoe" />;
    case 'role':
      return <RoleForm role="Senior Product Designer" />;
    case 'dateOfBirth':
      return <DateOfBirthForm dateOfBirth="11/11/2002" />;
    case 'email':
      return <EmailForm email="jhondoe@domain.com" />;
    case 'phonenumber':
      return <PhoneNumberForm countryCode="34" number="123456789" />;
    default:
      return null;
  }
};
