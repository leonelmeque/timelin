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
