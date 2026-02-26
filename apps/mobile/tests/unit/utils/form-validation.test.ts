import {
  validateFormFields,
  validateCommonPassword,
  validateEmail,
  validateUsername,
  validatePasswordStrength,
  validatePassword,
} from "../../../src/lib/utils/form-validation";

describe("Given various input fields expect", () => {
  test("All form fields to be filled", () => {
    const isValid = validateFormFields({
      username: "johndoe",
      email: "mail@domain.com",
      confirmPassword: "12345",
      password: "12345",
    });

    expect(isValid).toBeTruthy();
  });

  test("Password 1p_1oX3zw should be valid and strong and 123456 to be invalid", () => {
    expect(
      validateCommonPassword("1p_1oX3zw") &&
        validatePasswordStrength("1p_0oX3zwabr") &&
        validatePassword("1p_1oX3zw", "1p_1oX3zw")
    ).toBeTruthy();
    expect(
      validateCommonPassword("123456") &&
        validatePasswordStrength("lOVEME") &&
        validatePassword("123", "1p_1oX3zw")
    ).toBeFalsy();
  });

  test("Email mail@domain.com should be valid and mail@domain", () => {
    expect(validateEmail("mail@domain.com")).toBeTruthy();
    expect(validateEmail("mail@domain")).toBeFalsy();
  });

  test("Username john to be valid and 12 to be invalid", () => {
    expect(validateUsername("john")).toBeTruthy();
    expect(validateUsername("")).toBeFalsy();
  });
});
