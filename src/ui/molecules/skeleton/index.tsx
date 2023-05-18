import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Animated, StyleSheet } from 'react-native';

type SkeletonProps = {
  width: string | number;
  height: string | number;
  variant: 'rectangle' | 'circle';
};

const Context = createContext({
  opacity: new Animated.Value(0.3),
});

Context.displayName = "SkeletonContext"

export const Skeleton: FC<{ children: ReactNode }> & {
  Placeholder: FC<SkeletonProps>;
} = ({ children }) => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <Context.Provider value={{ opacity: opacity.current }}>
      {children}
    </Context.Provider>
  );
};


export const Placeholder: FC<SkeletonProps> = ({
  width,
  height,
  variant = 'rectangle'
}) => {
  const { opacity } = useContext(Context);
  let borderRadius = 4;
  if (variant === 'circle') {
    borderRadius =
      typeof height === 'string' ? parseInt(height) / 2 : height / 2;
  }

  return (
    <Animated.View
      style={[
        { opacity: opacity, width, height, borderRadius },
        styles.skeleton,
      ]}
    />
  );
};

Skeleton.Placeholder = Placeholder;
Skeleton.displayName = "Skeleton"

Placeholder.displayName = "SkeletonPlaceHolder"

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e7e7e7',
  },
});
