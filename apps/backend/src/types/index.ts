interface CommonKeys {
  id: string;
  description: string;
  timestamp: string;
  participants: Array<string> | any;
}

export enum TodoStatus {
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ON_GOING = 'ON_GOING',
  TODO = 'TODO',
}

export interface Todo extends CommonKeys {
  todo: string;
  status: TodoStatus;
  color: string;
  creator: string;
  startDate: string;
  endDate: string;
}

export interface TimelineEvent extends CommonKeys {
  title: string;
}

export interface Timeline {
  id: string;
  todo: string;
  events: Array<TimelineEvent>;
}

interface Person {
  firstName: string;
  lastName: string;
  birthdate: string;
}

export interface User<P = {}> extends Person {
  id: string;
  username: string;
  avatar: string;
  preferences?: P;
  todos: string[] | [];
}
