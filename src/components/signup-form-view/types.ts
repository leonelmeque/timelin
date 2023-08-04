import { User } from "../../lib";

export interface SignupFormViewProps {
  onSubmit: (data: UserFormProps) => Promise<void>;
  goToLogin: () => void;
}

export interface UserFormProps extends User {
  email: string;
  password: string;
  confirmPassword: string;
}
