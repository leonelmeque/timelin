import { FC } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { FormInput } from "@/components/form-input";
import { SignupFormViewProps } from "./types";
import { useSignUpForm } from "./use-signup-form";

export const SignupFormView: FC<SignupFormViewProps> = ({
  onSubmit,
  goToLogin,
}) => {
  const {
    state,
    errors,
    handleChange,
    handleSubmitAfterValidation,
    isSubmiting,
    enableSubmit,
  } = useSignUpForm({ onSubmit });

  return (
    <View className={cn("px-4")}>
      <FormInput
        placeholder="mail@domain.com"
        value={state.email}
        onChangeText={(value) => handleChange("email", value)}
        autoCapitalize="none"
        label="Email"
        errorText={errors.email}
        variant={!errors.email ? "caption" : "error"}
        captionText={
          errors.email
            ? "Enter your email address"
            : "Your email address is valid"
        }
      />
      <View className="h-4" />
      <FormInput
        label="Username"
        placeholder="jhon.doe.123"
        value={state.username}
        autoCapitalize="none"
        onChangeText={(value) => handleChange("username", value)}
        errorText={errors.username}
        captionText="Choose a username that is at least 3 characters long."
        variant={!errors.username ? "caption" : "error"}
      />
      <View className="h-4" />
      <FormInput
        label="Password"
        placeholder="o%42pe"
        value={state.password}
        autoCapitalize="none"
        secureTextEntry
        onChangeText={(value) => handleChange("password", value)}
        errorText={errors.password}
        variant={!errors.password ? "caption" : "error"}
        captionText="User passwords must be at least 8 characters long and contain at least one number, one uppercase letter, and one lowercase letter."
      />
      <View className="h-4" />
      <FormInput
        label="Confirm Password"
        value={state.confirmPassword}
        secureTextEntry
        autoCapitalize="none"
        onChangeText={(value) => handleChange("confirmPassword", value)}
        errorText={errors.confirmPassword}
        variant={!errors.confirmPassword ? "caption" : "error"}
        captionText="Use the same password as before, for verification."
      />
      <View className="h-8" />
      <Button
        size="lg"
        variant="default"
        disabled={!enableSubmit || isSubmiting}
        onPress={handleSubmitAfterValidation}
        accessibilityLabel="Create account"
      >
        <Text>{isSubmiting ? "Loading..." : "Create account"}</Text>
      </Button>
      <View className="h-4" />
      <Text
        className="text-grey-200 text-center"
      >
        Already have an account?{" "}
        <TouchableWithoutFeedback onPress={() => goToLogin()}>
          <Text
            className="text-primary-300 font-bold"
          >
            Login
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </View>
  );
};
