import styled from 'styled-components/native';
import { tokens } from '../../tokens';

const { typography } = tokens;

const StyledText = styled.Text<{
  size: keyof typeof typography.sizes;
  weight?: 'bold' | 'regular' | 'medium';
  colour?: string;
}>`
  font-size: ${(props) => props.theme.typography.sizes[props.size]}px;
  font-weight: ${(props) => (props.weight ? props.weight : 'regular')};
  color: ${({ theme: { colours }, colour }) =>
    colour ? colour : colours.neutrals.dark};
`;

export { StyledText as Text };
