export type TimelineEventProps = {
  id?: string;
  title: string;
  description: string;
  timestamp: string | number;
  participants?: string[];
  creator: string;
};

export type TodoProps = {
  id: string;
  todo: string;
  description: string;
  timestamp: string;
  creator?: string;
  status: TodoStatus;
  color: string;
  assigned?: string[];
  startDate: string;
  endDate: string;
};

export type TimelineProps = {
  id: string;
  todo: string;
  events: TimelineEventProps[];
};

export type UserProps = {
  id: string;
  username: string;
  avatar: string;
};

interface Person {
  firstname: string;
  lastname: string;
  birthdate: string;
}

export interface User<P = {}> extends Person {
  id: string;
  fullname?: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  preferences?: P;
  todos: string[];
  phonenumber?: {
    countryCode: string;
    number: string;
  }
}

export type IsLoading = 'FETCHING' | 'ERROR' | 'SUCCESS' | 'IDLE';

export enum TodoStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  TODO = 'TODO',
}

export type UserLogin = Pick<User, 'username' | 'password'>;
