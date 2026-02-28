import { CustomSafeAreaView } from "../../components/safe-area-view";
import { Header } from "@/components/header";
import { Text } from '@/components/ui/text';
import { View } from "react-native";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/cn";
import { useState } from "react";
import { SettingsButton } from "@/components/settings-button";
import { Pressable, ScrollView } from "react-native";
import { AvatarWithText } from "../../components/avatar-with-text";
import { User, api } from "../../lib";
import { useUserContext } from "../../context";
import { useRouter } from "expo-router";

export const SettingsScreen = () => {
  const [user, dispatch] = useUserContext();
  const router = useRouter();

  if (!user) return null;

  const { avatar, fullname } = user;

  const handleNavigation = (path: string) => {
    switch (path) {
      case "profile":
        router.push("/(tabs)/settings/profile");
        break;
      case "account":
        router.push("/(tabs)/settings/account");
        break;
      default:
        return null;
    }
  };

  const headerLeftContent = () => (
    <Text className="text-2xl font-bold tracking-tight">
      Settings
    </Text>
  );

  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleToggleNotifications = () => {
    Promise.resolve().then(() => {
      setNotificationsOn(!notificationsOn);
    }).catch(() => {});
  };

  const handleSignOut = async () => {
    await api.users.userSignOut();
    dispatch(null);
  };

  return (
    <CustomSafeAreaView>
      <Header renderLeftContent={headerLeftContent} />
      <ScrollView>
        <View className={cn("px-4")}>
          <View className="h-4" />
          <AvatarWithText
            name={fullname as string}
            role="Senior Product Designer"
            profilePicture={avatar}
          />
          <View className="h-8" />
          <Pressable onPress={() => handleNavigation("profile")}>
            <SettingsButton
              iconName="person-outline"
              settingName="Profile"
              description="Update your profile information."
            />
          </Pressable>
          <View className="h-8" />
          <Pressable onPress={() => handleNavigation("account")}>
            <SettingsButton
              iconName="add"
              settingName="Account"
              description="Change your password or delete your account."
            />
          </Pressable>
          <View className="h-8" />
          <Pressable>
            <SettingsButton
              iconName="notifications-none"
              settingName="Notifications"
              description="Stay up-to-date with changes."
              rightContent={
                <Switch checked={notificationsOn} onCheckedChange={handleToggleNotifications} />
              }
            />
          </Pressable>
          <View className="h-8" />
          <Pressable>
            <SettingsButton
              iconName="language"
              settingName="Language"
              description="Choose your prefered language"
            />
          </Pressable>
          <View className="h-8" />
          <Pressable>
            <SettingsButton iconName="info-outline" settingName="About us" />
          </Pressable>
          <View className="h-8" />
          <Pressable onPress={handleSignOut}>
            <SettingsButton iconName="logout" settingName="Log out" />
          </Pressable>
          <View className="h-8" />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};
