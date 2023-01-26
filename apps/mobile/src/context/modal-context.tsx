import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type ModalContextProps = {
  visibility: boolean;
  dispatch: Dispatch<SetStateAction<boolean>>;
};

const Context = createContext<ModalContextProps>({
  visibility: false,
  dispatch: (args) => {},
});

const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(false);

  const value: ModalContextProps = useMemo(
    () => ({ visibility: state, dispatch: setState }),
    [state]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const useCustomModal = () => {
  const { visibility, dispatch } = useContext<ModalContextProps>(Context);
  return [visibility, dispatch] as const;
};

export { Provider, useCustomModal };
