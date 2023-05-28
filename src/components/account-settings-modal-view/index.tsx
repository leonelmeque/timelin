import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Box, Spacer, Text } from "../../ui/atoms";
import { CustomSafeAreaView } from "../safe-area-view";
import { MaterialIcons } from "@expo/vector-icons";
import { ChangePasswordForm } from "./change-password-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useCallback } from "react";

type RouteParams = {
  params: {
    value: string;
  };
};

export const AccountSettingsModalView = () => {
  const {
    params: { value },
  } = useRoute<RouteProp<RouteParams>>();

  const navigation = useNavigation();

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
          onPress={() => navigation.goBack()}
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
