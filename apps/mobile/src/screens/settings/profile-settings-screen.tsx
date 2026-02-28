import { FC } from "react";
import { Alert, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Header } from "@/components/header";
import { Text } from '@/components/ui/text';
import { View } from "react-native";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import { CustomSafeAreaView } from "../../components/safe-area-view";
import { LeftArrowWithTextButton } from "../../components/back-button";
import { TextLabelPresentation } from "@/components/text-label-presentation";
import { useUserContext } from "../../context";
import { User, utils } from "../../lib";
import { useImagePicker } from "../../lib/hooks/use-image-picker";
import { dateFormatter } from "../../lib/utils";
import { normalizedCountries } from "../../lib/utils/normalized-countries";
import { useImageUpload } from "../../lib/hooks/use-image-upload";


export const ProfileSettingsScreen: FC = () => {
  const router = useRouter();
  const [user] = useUserContext();
  const { openImagePicker } = useImagePicker();

  const { handleImageUpload, isUploading, percentage } = useImageUpload();
  const { formatPhoneNumber } = utils.phoneNumber;

  if (!user) return null;

  const { fullname, username, email, phonenumber, birthdate, avatar } = user;

  const navigateToEditProfileModal = (value: string) => {
    router.push(`/(tabs)/settings/profile/${value}`);
  };

  const handleProfileImage = async () => {
    try {
      const image = await openImagePicker();

      await handleImageUpload({
        path: image?.uri as string,
        size: image?.fileSize as number,
      });
    } catch (err: any) {
      // TODO: implement the error apiF
      Alert.alert("Image upload error", err);
    }
  };

  const phoneNumber = formatPhoneNumber(
    normalizedCountries(phonenumber?.countryCode ?? "US")[0].code,
    phonenumber?.number ?? ""
  );
  const birthDate =  birthdate ? dateFormatter(Number(birthdate), { dateStyle: "short" }) : "N/A"

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <LeftArrowWithTextButton
            onPress={() => router.back()}
            colour="#15141a"
            text="Back"
          />
        )}
        renderRightContent={() => (
          <Text className="font-bold text-grey-300">
            Profile
          </Text>
        )}
      />
      <ScrollView>
        <View className={cn("px-4")}>
          <Pressable onPress={handleProfileImage}>
            <Avatar
              alt="profile"
              style={{ width: 124, height: 124, borderRadius: 8, alignSelf: "center" }}
            >
              <AvatarImage source={{ uri: avatar }} />
            </Avatar>
          </Pressable>
          <View className="h-8" />
          <Pressable onPress={() => navigateToEditProfileModal("name")}>
            <TextLabelPresentation label="Full name" value={fullname} />
          </Pressable>
          <View className="h-4" />
          <Pressable onPress={() => navigateToEditProfileModal("username")}>
            <TextLabelPresentation label="Username" value={username} />
          </Pressable>
          <View className="h-4" />
          <Pressable onPress={() => navigateToEditProfileModal("dateOfBirth")}>
            <TextLabelPresentation
              label="Date of birth"
              value={birthDate}
            />
          </Pressable>
          <View className="h-4" />
          <Pressable onPress={() => navigateToEditProfileModal("email")}>
            <TextLabelPresentation label="Email" value={email} />
          </Pressable>
          <View className="h-4" />
          <Pressable onPress={() => navigateToEditProfileModal("phonenumber")}>
            <TextLabelPresentation label="Phone" value={phoneNumber} />
          </Pressable>
        </View>
        <View className="h-4" />
      </ScrollView>
    </CustomSafeAreaView>
  );
};
