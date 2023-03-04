import { User } from '@todo/commons';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type UserContextProps = {
  user: User | null;
  dispatch: (args: User | null) => void;
};

const Context = createContext<UserContextProps>({
  user: null,
  dispatch: (args) => { },
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<User | null>(null);

  const value: UserContextProps = useMemo(
    () => ({ user: state, dispatch: setState }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useUserContext = () => {
  const { user, dispatch } = useContext<UserContextProps>(Context);
  return [user, dispatch] as const;
};

export { Provider, useUserContext };
