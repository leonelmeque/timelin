import { useState, useRef } from "react";
import { SignupFormViewProps, UserFormProps } from "./types";
import {
  validateEmail,
  validateUsername,
  validateCommonPassword,
  validatePassword,
} from "../../lib/utils";
import { api } from "../../lib";

export const useSignUpForm = ({
  onSubmit,
}: Pick<SignupFormViewProps, "onSubmit">) => {
  const [state, setState] = useState<Partial<UserFormProps>>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<UserFormProps>>({});
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<any>(null);

  const handleChange = (key: keyof Partial<UserFormProps>, value: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const newState = { ...state, [key]: value };

    timerRef.current = setTimeout(() => {
      validateWhileTyping(newState, key);
    }, 300);

    setState(newState);
  };

  const validateWhileTyping = async (
    state: Partial<UserFormProps>,
    key: keyof Partial<UserFormProps>
  ) => {
    const cleanErrors = (key: keyof Partial<UserFormProps>) => {
      const newErrors = { ...errors };
      delete newErrors[key];
      setErrors(newErrors);
    };

    switch (key) {
      case "email":
        {
          if (!validateEmail(state.email as string)) {
            setErrors({ ...errors, email: "Email is not valid" });
          } else {
            cleanErrors(key);
          }
        }
        break;
      case "username":
        {
          if (!validateUsername(state.username as string)) {
            setErrors({ ...errors, username: "Username is not valid" });
            return;
          } else {
            cleanErrors(key);
          }

          if (await api.users.verifyUsername(state.username as string)) {
            setErrors({ ...errors, username: "Username already exists!" });
          } else {
            cleanErrors(key);
          }
        }
        break;

      case "password":
        {
          if (
            !validateCommonPassword(state.password as string) ||
            !state.password
          ) {
            setErrors({ ...errors, password: "Password is not valid" });
          } else {
            cleanErrors(key);
          }
        }
        break;

      case "confirmPassword":
        {
          if (
            !validatePassword(
              state.password as string,
              state.confirmPassword as string
            ) ||
            !state.confirmPassword
          ) {
            setErrors({ ...errors, confirmPassword: "Password is not valid" });
          } else {
            cleanErrors(key);
          }
        }
        break;
      default: {
        return;
      }
    }
  };

  const validateForm = () => {
    const newErrors = {} as Partial<UserFormProps>;

    if (!state.email) {
      newErrors.email = "Email is required";
    }

    if (!state.username) {
      newErrors.username = "Username is required";
    }

    if (!state.password) {
      newErrors.password = "Password is required";
    }

    if (!state.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }

    if (!validateUsername(state.username as string)) {
      newErrors.username = "Username is not valid";
    }

    if (!validateEmail(state.email as string) && state.email) {
      debugger;
      newErrors.email = "Email is not valid";
    }

    if (
      !validatePassword(
        state.password as string,
        state.confirmPassword as string
      )
    ) {
      newErrors.confirmPassword = "Password does not match the previous one";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const hasFilledMandatoryFields = () => {
    let output = true;

    Object.values(state).forEach((value) => {
      if (!value) {
        output = false;
      }
    });

    return output;
  };

  const handleSubmitAfterValidation = async () => {
    try {
      if (validateForm()) {
        setIsLoading(true);
        await onSubmit(state as UserFormProps);
        setIsLoading(false);
      }
    } catch (err) {}
  };

  const enableSubmit: boolean =
    hasFilledMandatoryFields() && Object.keys(errors).length === 0;

  return {
    state,
    errors,
    hasFilledMandatoryFields,
    isSubmiting: isLoading,
    handleSubmitAfterValidation,
    handleChange,
    enableSubmit,
  };
};
