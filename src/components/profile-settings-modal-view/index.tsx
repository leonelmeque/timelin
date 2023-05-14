import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Spacer, Text } from '../../ui/atoms';
import { MaterialIcons } from '@expo/vector-icons';
import { DateOfBirthForm } from './date-of-birth-form';
import { EmailForm } from './email-form';
import { PhoneNumberForm } from './phone-number-form';
import { ProfileFullNameForm } from './profile-full-name-form';
import { RoleForm } from './role-form';
import { UsernameForm } from './username-form';
import { useUserContext } from '../../context';
import { User, api } from '../../lib';

const headingTitle = {
  name: 'Edit full name',
  username: 'Change username',
  role: 'Change role',
  dateOfBirth: 'Update date of birth',
  email: 'Change email',
  phonenumber: 'Update phone number',
};

export const ProfileSettingsModalView = () => {
  const {
    params: { value },
  } = useRoute() as any;

  const navigation = useNavigation();
  const [user, dispatch] = useUserContext();
  const { fullname, username, birthdate, email, phonenumber } = user as User;
  const { updateProfileName, updateEmail, sendEmailVerification, updateBirthDate, updateUsername } =
    api.users.useUpdateProfile();

  const handleSubmitFullName = async <V extends string>(values: V) => {
    try {
      await updateProfileName(values);
      dispatch({ ...user, fullname: values } as User);
      navigation.goBack();
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const handleSubmitUsername = async (values: string) => {
    try {
      await updateUsername(values)
      dispatch({ ...user, username: values } as User);
      navigation.goBack()
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const handleSubmitBirthDate = async (values: number) => {
    try {
      dispatch({ ...user, birthdate: String(values) } as User);
      updateBirthDate(String(values))
      navigation.goBack()
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const handleSubmitEmail = async (values: string) => {
    try {
      await sendEmailVerification();
      await updateEmail(values);
      dispatch({ ...user, email: values } as User);
      navigation.goBack();
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const RenderFormFields = () => {
    switch (value) {
      case 'name':
        return (
          <ProfileFullNameForm
            fullName={fullname as string}
            onSubmit={handleSubmitFullName}
          />
        );
      case 'username':
        return (
          <UsernameForm username={username} onSubmit={handleSubmitUsername} />
        );
      case 'role':
        return <RoleForm role="Senior Product Designer" />;
      case 'dateOfBirth':
        return (
          <DateOfBirthForm
            dateOfBirth={birthdate}
            onSubmit={handleSubmitBirthDate}
          />
        );
      case 'email':
        return <EmailForm email={email} onSubmit={handleSubmitEmail} />;
      case 'phonenumber':
        return (
          <PhoneNumberForm
            countryCode={phonenumber?.countryCode as string}
            number={phonenumber?.number as string}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Spacer size="8" />
      <MaterialIcons
        name="close"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <Spacer size="8" />
      <Text size="heading" weight="bold">
        {headingTitle[value as keyof typeof headingTitle]}
      </Text>
      <Spacer size="8" />
      <RenderFormFields />
    </Box>
  );
};
