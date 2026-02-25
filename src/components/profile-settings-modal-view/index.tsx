import { useRouter, useLocalSearchParams } from "expo-router";
import { Box, Spacer, Text } from "../../ui/atoms";
import { MaterialIcons } from "@expo/vector-icons";
import { DateOfBirthForm } from "./date-of-birth-form";
import { EmailForm } from "./email-form";
import { PhoneNumberForm } from "./phone-number-form";
import { ProfileFullNameForm } from "./profile-full-name-form";
import { RoleForm } from "./role-form";
import { UsernameForm } from "./username-form";
import { useUserContext } from "../../context";
import { User, api } from "../../lib";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useCallback } from "react";

const headingTitle = {
  name: "Edit full name",
  username: "Change username",
  role: "Change role",
  dateOfBirth: "Update date of birth",
  email: "Change email",
  phonenumber: "Update phone number",
};

export const ProfileSettingsModalView = () => {
  const { value } = useLocalSearchParams<{ value: string }>();

  const router = useRouter();
  const [user, dispatch] = useUserContext();

  if (!user) return null;

  const { fullname, username, birthdate, email, phonenumber } = user;
  const {
    updateProfileName,
    updateEmail,
    sendEmailVerification,
    updateBirthDate,
    updateUsername,
    updatePhoneNumber,
  } = api.users.useUpdateProfile();

  const handleSubmitFullName = async <V extends string>(values: V) => {
    try {
      await updateProfileName(values);
      dispatch({ ...user, fullname: values } as User);
      router.back();
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const handleSubmitUsername = async (values: string) => {
    try {
      await updateUsername(values);
      dispatch({ ...user, username: values } as User);
      router.back();
    } catch (err) {
      //TODO: write an error api
      console.error(err);
      Alert.alert("Username already taken");
    }
  };

  const handleSubmitBirthDate = async (values: number) => {
    try {
      dispatch({ ...user, birthdate: String(values) } as User);
      updateBirthDate(String(values));
      router.back();
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
      router.back();
    } catch (err) {
      //TODO: write an error api
      console.error(err);
    }
  };

  const handlePhoneNumber = async (countryCode: string, number: string) => {
    try {
      await updatePhoneNumber(countryCode, number);
      dispatch({ ...user, phonenumber: { countryCode, number } } as User);
      router.back();
    } catch (err) { }
  };

  const RenderFormFields = useCallback(() => {
    switch (value) {
      case "name":
        return (
          <ProfileFullNameForm
            fullName={fullname as string}
            onSubmit={handleSubmitFullName}
          />
        );
      case "username":
        return (
          <UsernameForm username={username} onSubmit={handleSubmitUsername} />
        );
      case "role":
        return <RoleForm role="Senior Product Designer" />;
      case "dateOfBirth":
        return (
          <DateOfBirthForm
            dateOfBirth={birthdate}
            onSubmit={handleSubmitBirthDate}
          />
        );
      case "email":
        return <EmailForm email={email} onSubmit={handleSubmitEmail} />;
      case "phonenumber":
        return (
          <PhoneNumberForm
            countryCode={phonenumber?.countryCode as string}
            number={phonenumber?.number as string}
            onSubmit={handlePhoneNumber}
          />
        );
      default:
        return null;
    }
  }, []);

  return (
    <Box>
      <Spacer size="8" />
      <MaterialIcons
        name="close"
        size={24}
        color="black"
        onPress={() => router.back()}
      />
      <Spacer size="8" />
      <Text size="heading" weight="bold">
        {headingTitle[value as keyof typeof headingTitle]}
      </Text>
      <ScrollView bounces={false}>
        <Spacer size="8" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <RenderFormFields />
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};
