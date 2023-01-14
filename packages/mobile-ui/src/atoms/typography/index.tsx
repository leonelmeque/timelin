import styled from 'styled-components/native';
import { tokens } from '@todo/commons';

const { typography, colours } = tokens;

const StyledText = styled.Text<{
  size: keyof typeof typography.sizes;
  weight?: 'bold' | 'regular';
  colour?: keyof typeof colours.light;
}>`
  font-size: ${(props) => props.theme.typography.sizes[props.size]}px;
  font-weight: ${(props) => (props.weight ? props.weight : 'regular')};
  color: ${(props) =>
    props.colour
      ? props.theme.colours[props.colour]
      : props.theme.colours.dark};
`;

export { StyledText as Text };
