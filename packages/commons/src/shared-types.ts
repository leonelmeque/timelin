export type TimelineEventProps = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  assigned?: string[];
};

export type TodoProps = {
  id: string;
  todo: string;
  description: string;
  timestamp: string;
  creator?: string;
  status: string;
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
  username: string;
  email: string;
  password: string;
  avatar: string;
  preferences?: P;
  todos: string[];
}

export type IsLoading = 'FETCHING' | 'ERROR' | 'SUCCESS' | 'IDLE';

export enum TodoStatus {
  ON_GOING = 'ON_GOING',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
  TODO = 'TODO',
}
