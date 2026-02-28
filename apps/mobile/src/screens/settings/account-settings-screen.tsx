import { LeftArrowWithTextButton } from "../../components/back-button";
import { CustomSafeAreaView } from "../../components/safe-area-view";
import { View } from "react-native";
import { cn } from "@/lib/cn";
import { Header } from "@/components/header";
import { SettingsButton } from "@/components/settings-button";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useUserContext } from "../../context";
import { useConfirmation } from "../../hooks/use-confirmation";
import { useTranslation } from "react-i18next";
import { api } from "../../lib";

export const AccountSettingsScreen = () => {
  const [, dispatch] = useUserContext();
  const router = useRouter();
  const { t } = useTranslation();
  const { ConfirmationDialog, handleConfirm } = useConfirmation({
    confirmText: t("settings.account_settings.modal.confirm_text.label"),
    cancelText: t("settings.account_settings.modal.cancel_text.label"),
    message: t("settings.account_settings.modal.message.text"),
    title: t("settings.account_settings.modal.title.text"),
    onConfirm: async () => {
      await api.users.deleteAccount();
      dispatch(null);
    },
    onCancel: () => {},
  });

  return (
    <CustomSafeAreaView>
      <ConfirmationDialog />
      <Header
        renderLeftContent={() => (
          <LeftArrowWithTextButton
            text="Back"
            onPress={() => router.back()}
            colour="#15141A"
          />
        )}
      />
      <View className="h-8" />
      <View className={cn("px-4")}>
        <Pressable
          onPress={() =>
            router.push("/(tabs)/settings/account/change-password")
          }
        >
          <SettingsButton
            iconName="lock"
            settingName="Change password"
            description="Update your current password"
          />
        </Pressable>
        <View className="h-8" />
        <Pressable
          onPress={() =>
            //@ts-ignore
            handleConfirm()
          }
        >
          <SettingsButton
            iconName="delete"
            settingName="Delete account"
            description="Permanently delete your account"
            className="bg-danger-50"
          />
        </Pressable>
      </View>
    </CustomSafeAreaView>
  );
};
