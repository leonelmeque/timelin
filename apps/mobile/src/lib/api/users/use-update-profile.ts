import { apiClient } from '../../../services/api-client';
import { authState } from '../../../services/auth-state';

export const useUpdateProfile = () => {
  const updateProfileName = async (name: string) => {
    await apiClient.patch('/auth/profile', { displayName: name });
    authState.updateUser({ displayName: name });
  };

  const updateUsername = async (username: string) => {
    const user = authState.getUser();
    if (user) {
      await apiClient.patch(`/users/${user.uid}`, { username });
    }
  };

  const updateProfilePhoto = async (photoURL: string) => {
    await apiClient.patch('/auth/profile', { photoURL });
    authState.updateUser({ photoURL });
  };

  const updateBirthDate = async (birthdate: string) => {
    const user = authState.getUser();
    if (user) {
      await apiClient.patch(`/users/${user.uid}`, { birthdate });
    }
  };

  const updatePhoneNumber = async (countryCode: string, number: string) => {
    const user = authState.getUser();
    if (user) {
      await apiClient.patch(`/users/${user.uid}`, {
        phonenumber: { countryCode, number },
      });
    }
  };

  const updatePassword = async (password: string) => {
    await apiClient.patch('/auth/profile', { password });
  };

  const sendResetPasswordEmail = async () => {
    const user = authState.getUser();
    if (user?.email) {
      await apiClient.post('/auth/password-reset', { email: user.email });
    }
  };

  const updateEmail = async (email: string) => {
    await apiClient.patch('/auth/profile', { email });
    authState.updateUser({ email });
  };

  const sendEmailVerification = async () => {
    await apiClient.post('/auth/email-verification');
  };

  const reauthenticatePassword = async (password: string) => {
    await apiClient.post('/auth/reauthenticate', { password });
  };

  const deleteUser = async () => {
    await apiClient.delete('/auth/account');
    authState.clear();
  };

  return {
    updateProfileName,
    updateProfilePhoto,
    updateBirthDate,
    updatePassword,
    sendResetPasswordEmail,
    updateEmail,
    updatePhoneNumber,
    sendEmailVerification,
    deleteUser,
    updateUsername,
    reauthenticatePassword,
  } as const;
};
