import { countryCodes } from '../constants/country-codes';

export const normalizedCountries = (initialSelectedCountry: string) => {
  const index = countryCodes.findIndex(
    (item) => item.code === initialSelectedCountry
  );

  countryCodes.unshift(...countryCodes.splice(index));

  return countryCodes.map(({ code, dial_code, name }) => ({
    dialcode: dial_code,
    label: name,
    code,
  }));
};
