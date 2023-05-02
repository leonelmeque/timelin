import { View } from 'react-native';
import styled from 'styled-components/native';

export const Box = styled(({ children, style, ...rest }) => (
  <View style={style} {...rest}>
    {children}
  </View>
))`
  padding: 0px 16px;
`;

Box.displayName = 'Box';
