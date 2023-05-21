import { FC } from "react";
import {
  ValidationErrors,
  ValidationFunction,
  useForm,
} from "../../hooks/use-form";
import { PhoneInput } from "../../ui/molecules";
import { normalizedCountries } from "../../lib/utils/normalized-countries";
import { Button, Spacer } from "../../ui/atoms";
import { KeyboardAvoidingView } from "react-native";
import { utils } from "../../lib";

type PhoneNumberFormProps = {
  countryCode: string;
  number: string;
  onSubmit?: (countryCode: string, number: string) => void;
};

type PhoneNumberForm = {
  countryCode: string;
  number: string;
};

export const PhoneNumberForm: FC<PhoneNumberFormProps> = ({
  onSubmit = () => { },
  ...props
}) => {

  const validation: ValidationFunction<PhoneNumberForm> = (values) => {
    const newErrors: ValidationErrors<PhoneNumberForm> = {};
    const { validatePhoneNumber } = utils.phoneNumber;

    if (!validatePhoneNumber(values.countryCode, values.number)) {
      newErrors.number = "Phone number is invalid";
    }

    return newErrors;
  };

  const {
    values: { countryCode, number },
    errors,
    handleChange: onFormChange,
  } = useForm(props, validation);

  const countries = normalizedCountries(countryCode);

  return (
    <KeyboardAvoidingView>
      <PhoneInput
        dropdownList={countries}
        dialcode={countries[0].dialcode}
        code={countries[0].code}
        number={number}
        success={!errors.number && number.length > 3}
        hasError={errors.number !== undefined}
        onSelectCountryCode={onFormChange("countryCode")}
        onNumberChange={onFormChange("number")}
      />
      <Spacer size="64" />

      <Button
        label="Submit"
        variant={!errors.number ? "primary" : "disabled"}
        size="lg"
        onPress={() => onSubmit(countryCode, number)}
        disabled={errors.number !== undefined}
      />
    </KeyboardAvoidingView>
  );
};

PhoneNumberForm.defaultProps = {
  countryCode: "US",
  number: "",
};
