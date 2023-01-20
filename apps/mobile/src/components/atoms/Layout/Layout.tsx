import { StyledLayout } from "./styles";
import { ViewProps } from 'react-native';

const Box = ({ children, style, ...rest }: ViewProps) => (
  <StyledLayout style={style} {...rest}>
    {children}
  </StyledLayout>
);

export default Box;