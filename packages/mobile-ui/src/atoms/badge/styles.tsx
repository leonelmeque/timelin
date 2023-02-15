import styled, { css } from 'styled-components/native';
import { BadgeBGColor } from '../../shared-types';

const coloredStatus = css`
  border-radius: 4px;
  border-bottom-right-radius: 0px;
  padding: 8px 8px;
`;

const simppleStatus = css`
  border-radius: 9999px;
  padding: 4px 8px;
`;

export const StyledBadge = styled.View<{
  bg?: string;
  type?: 'colored' | 'simple';
}>`
  ${(props) => (props.type === 'colored' ? coloredStatus : simppleStatus)}
  background: ${({ theme, type, bg }) =>
    type === 'colored' ? bg : theme.colours.neutrals.white};
  align-items: center;
`;

StyledBadge.defaultProps = {
  type: 'simple',
};
