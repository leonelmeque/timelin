import styled, { useTheme } from "styled-components/native";
import { LeftArrowWithTextButton } from "../../components/back-button";
import { CustomSafeAreaView } from "../../components/safe-area-view";
import { Box, Spacer } from "../../ui/atoms";
import { Header } from "../../ui/organisms";
import { SettingsButton } from "../../ui/organisms/settings-button";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useUserContext } from "../../context";
import { useConfirmation } from "../../hooks/use-confirmation";
import { useTranslation } from "react-i18next";
import { api } from "../../lib";

const RemoveAccountButton = styled(SettingsButton)`
  background-color: ${({ theme }) => theme.colours.danger.D50};
`;

export const AccountSettingsScreen = () => {
  const theme = useTheme();
  const [, dispatch] = useUserContext();
  const navigation = useNavigation();
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
            onPress={() => navigation.goBack()}
            colour={theme.colours.neutrals.dark}
          />
        )}
      />
      <Spacer size="16" />
      <Box>
        <Pressable
          onPress={() =>
            //@ts-ignore
            navigation.navigate("Settings/Account-Modal", {
              value: "change-password",
            })
          }
        >
          <SettingsButton
            iconName="lock"
            settingName="Change password"
            description="Update your current password"
          />
        </Pressable>
        <Spacer size="16" />
        <Pressable
          onPress={() =>
            //@ts-ignore
            handleConfirm()
          }
        >
          <RemoveAccountButton
            iconName="delete"
            settingName="Delete account"
            description="Permanently delete your account"
          />
        </Pressable>
      </Box>
    </CustomSafeAreaView>
  );
};
