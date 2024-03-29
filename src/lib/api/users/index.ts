import { getUserInformation } from './get-user-information';
import { userSignIn } from './user-signin';
import { userSignUp } from './user-signup';
import { userSignOut } from './user-signout';
import { userSignInWithPersistence } from './user-signin-with-persistence';
import { getUserProfile } from './get-user-profile';
import { useUpdateProfile } from './use-update-profile';
import { verifyUsername } from "./verify-username";
import { deleteAccount } from "./delete-account";

export const users = {
  getUserInformation,
  userSignIn,
  userSignUp,
  userSignOut,
  userSignInWithPersistence,
  getUserProfile,
  useUpdateProfile,
  verifyUsername,
  deleteAccount,
};
