import { createCustomToken } from './create-custom-token';
import { getUserInformation } from './get-user-information';
import { revokeCustomToken } from './revoke-custom-token';
import { userSignIn } from './user-signin';
import { userSignUp } from './user-signup';
import { userSignOut } from './user-signout';

export const users = {
  createCustomToken,
  getUserInformation,
  revokeCustomToken,
  userSignIn,
  userSignUp,
  userSignOut,
};
