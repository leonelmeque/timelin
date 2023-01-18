export type TodoProps = {
  id: string;
  todo: string;
  description: string;
  timestamp: string;
  status: string;
  color: string;
  assigned?: string[];
};

export type UserProps = {
  id: string;
  username: string;
  avatar: string;
};
