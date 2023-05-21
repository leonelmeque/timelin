import libphonenumber from "google-libphonenumber";

export function formatPhoneNumber(countryCode: string, number: string) {
  try {
    const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    const _number = phoneUtil.parseAndKeepRawInput(
      number,
      countryCode || "US"
    );

    if (!phoneUtil.isValidNumber(_number)) {
      return "";
    }

    return phoneUtil.format(
      _number,
      libphonenumber.PhoneNumberFormat.INTERNATIONAL
    );
  } catch (err) {
    console.error(err);
    return "";
  }
}