import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { Caption } from "../../atoms/caption";
import { Input } from "../../atoms/input";
import { Spacer } from "../../atoms/spacer";
import { Text } from "../../atoms/typography";
interface FormInputProps extends TextInputProps {
  label?: string;
  captionText?: string;
  errorText?: string;
  successText?: string;
  disabled?: boolean;
  variant?: "error" | "success" | "caption";
}

export const FormInput = forwardRef<TextInput, FormInputProps>(
  ({ label, captionText, errorText, successText, variant, ...rest }, ref) => {
    const caption =
      (variant === "error" && errorText) ||
      (variant === "success" && successText) ||
      captionText ||
      "";

    return (
      <>
        {label && (
          <Text size="body" weight="bold">
            {label}
          </Text>
        )}
        <Spacer size="4" />
        <Input
          ref={ref}
          hasError={variant === "error"}
          success={variant === "success"}
          {...rest}
        />
        <Spacer size="4" />
        {<Caption variant={variant} caption={caption} />}
      </>
    );
  }
);

FormInput.displayName = "FormInput";
