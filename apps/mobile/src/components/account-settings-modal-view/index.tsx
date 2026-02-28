import { useRouter, useLocalSearchParams } from "expo-router";
import { Text } from '@/components/ui/text';
import { View } from "react-native";
import { cn } from "@/lib/cn";
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
      <View className={cn("px-4 bg-white flex-1")}>
        <View className="h-4" />
        <MaterialIcons
          name="close"
          size={24}
          color="black"
          onPress={() => router.back()}
        />
        <View className="h-4" />
        <Text className="text-2xl font-bold tracking-tight">
          Change password
        </Text>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <RenderFrom />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
};
