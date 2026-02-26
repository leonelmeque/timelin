import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { User } from '../lib';

type UserContextProps = {
  user: User | null;
  dispatch: (args: User | null) => void;
};

const Context = createContext<UserContextProps>({
  user: null,
  dispatch: (args) => { },
});

const Provider: FC<PropsWithChildren & { initUser: User<{}> | null }> = ({ children, initUser }) => {
  const [state, setState] = useState<User | null>(initUser);

  const value: UserContextProps = useMemo(
    () => ({ user: state, dispatch: setState }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

Provider.displayName = "UserProvider"

const useUserContext = () => {
  const { user, dispatch } = useContext<UserContextProps>(Context);
  return [user, dispatch] as const;
};

export { Provider, useUserContext };
