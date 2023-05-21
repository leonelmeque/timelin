import libphonenumber from "google-libphonenumber";

export function validatePhoneNumber(countryCode: string, number: string) {
  try {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const _number = phoneUtil.parseAndKeepRawInput(number, countryCode || "US");

    if (!phoneUtil.isValidNumber(_number)) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
}