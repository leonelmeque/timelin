import { SvgProps } from 'react-native-svg';

declare module '*.svg' {
  const content: React.FunctionComponent<SvgProps>;
  export default content;
}
