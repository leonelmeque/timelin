export const validateFormFields = ({
  email,
  username,
  password,
  confirmPassword,
}: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  return email && username && password && confirmPassword;
};

export const validatePassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const validateEmail = (email: string) => {
  return email?.includes('@');
};

export const validateUsername = (username: string) => {
  if (!username?.length) return false;
  return username?.length > 3;
};

export const validateCommonPassword = (password: string) => {
  const commonPassword = ['123456', 'password', 'qwerty'];
  return !commonPassword.includes(password);
};

export const validatePasswordStrength = (password: string) => {
  let strength = 0;

  if (password.length >= 8) {
    strength++;
  }

  const upperCaseRegex = /[A-Z]/g;
  const lowerCaseRegex = /[a-z]/g;
  const numberRegex = /[0-9]/g;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;

  if (upperCaseRegex.test(password)) {
    strength++;
  }

  if (lowerCaseRegex.test(password)) {
    strength++;
  }

  if (numberRegex.test(password)) {
    strength++;
  }

  if (specialCharRegex.test(password)) {
    strength++;
  }

  // Check if password has at least half of the characters unique
  const uniqureChars = new Set(password.split(''));
  if (uniqureChars.size >= password.length / 2) {
    strength++;
  }

  return strength >= 3;
};
