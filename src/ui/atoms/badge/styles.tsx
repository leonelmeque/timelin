import styled, { css } from 'styled-components/native';

const coloredStatus = css`
  border-radius: 4px;
  border-bottom-right-radius: 0px;
  padding: 8px 8px;
`;

const simppleStatus = css`
  border-radius: 9999px;
  padding: 4px 8px;
`;

type StyledBadgeProps = {
  bg?: string;
  type?: 'colored' | 'simple';
};

export const StyledBadge = styled.View.attrs<StyledBadgeProps>((props) => ({
  type: props.type ?? 'simple',
}))<StyledBadgeProps>`
  ${(props) => (props.type === 'colored' ? coloredStatus : simppleStatus)}
  background: ${({ theme, type, bg }) =>
    type === 'colored' ? bg : theme.colours.neutrals.white};
  align-items: center;
`;
