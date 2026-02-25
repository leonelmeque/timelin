import { useRouter, useLocalSearchParams } from "expo-router";
import { Box, Spacer, Text } from "../../ui/atoms";
import { CustomSafeAreaView } from "../safe-area-view";
import { MaterialIcons } from "@expo/vector-icons";
import { ChangePasswordForm } from "./change-password-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useCallback } from "react";

export const AccountSettingsModalView = () => {
  const { value } = useLocalSearchParams<{ value: string }>();

  const router = useRouter();

  const RenderFrom = useCallback(() => {
    if (value === "change-password") {
      return <ChangePasswordForm />;
    } else if (value === "delete-account") {
      return <></>;
    }
    return <></>;
  }, []);

  return (
    <CustomSafeAreaView>
      <Box style={{ backgroundColor: "white", flex: 1 }}>
        <Spacer size="8" />
        <MaterialIcons
          name="close"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
        <Spacer size="8" />
        <Text size="heading" weight="bold">
          Change password
        </Text>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <RenderFrom />
          </KeyboardAvoidingView>
        </ScrollView>
      </Box>
    </CustomSafeAreaView>
  );
};
