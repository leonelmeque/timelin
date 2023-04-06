import { createCustomToken } from './create-custom-token';
import { createUser } from './create-user';
import { getUserInformation } from './get-user-information';
import { revokeCustomToken } from './revoke-custom-token';
import { updateTodoList } from './update-todo-list';

export const users = {
  createCustomToken,
  createUser,
  getUserInformation,
  revokeCustomToken,
  updateTodoList,
};
