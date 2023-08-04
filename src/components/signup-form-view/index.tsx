import { FC } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { tokens } from "../../lib";
import { Box, Spacer, Text, Button } from "../../ui/atoms";
import { FormInput } from "../../ui/molecules";
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
    <Box>
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
      <Spacer size="8" />
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
      <Spacer size="8" />
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
      <Spacer size="8" />
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
      <Spacer size="16" />
      <Button
        label="Create account"
        size="lg"
        variant={!enableSubmit ? "disabled" : "primary"}
        disabled={!enableSubmit}
        onPress={handleSubmitAfterValidation}
        isLoading={isSubmiting}
        accessibilityLabel="Create account"
      />
      <Spacer size="8" />
      <Text
        size="body"
        colour={tokens.colours.light.greys.G200}
        style={{ textAlign: "center" }}
      >
        Already have an account?{" "}
        <TouchableWithoutFeedback onPress={() => goToLogin()}>
          <Text
            size="body"
            colour={tokens.colours.light.primary.P300}
            weight="bold"
          >
            Login
          </Text>
        </TouchableWithoutFeedback>
      </Text>
    </Box>
  );
};
