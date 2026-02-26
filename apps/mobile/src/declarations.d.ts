import 'styled-components/native'
import { DefaultTheme as Theme } from './ui/theme';
import { SvgProps } from 'react-native-svg';

declare module '*.svg' {
  const content: React.FunctionComponent<SvgProps>;
  export default content;
}

declare module 'styled-components/native' {
  interface DefaultTheme extends Theme { }
}

declare module 'styled-components' {
  interface DefaultTheme extends Theme { }
}
