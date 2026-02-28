import { Dimensions, KeyboardAvoidingView, KeyboardAvoidingViewProps, View, ViewProps } from 'react-native';
import { cn } from '@/lib/cn';

export const ModalOverLay = (props: ViewProps) => (
  <View
    className={cn("absolute opacity-20 px-4 bg-grey-300")}
    style={{
      height: Dimensions.get('screen').height,
      width: Dimensions.get('screen').width,
    }}
    {...props}
  />
);

export const StyledKeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => (
  <KeyboardAvoidingView
    className={cn("justify-end mt-auto rounded-t-3xl bg-neutrals-white")}
    {...props}
  />
);
