import styled from 'styled-components/native';

export const StyledBadge = styled.View<{ bg?: string }>`
  border-top-right-radius: ${({ theme }) => theme.sizes.small / 2}px;
  border-top-left-radius: ${({ theme }) => theme.sizes.small / 2}px;
  border-bottom-left-radius: ${({ theme }) => theme.sizes.small / 2}px;
  background: ${({ theme, bg }) => (bg ? bg : theme.colours.primary.P75)};
  padding: 8px;
  align-items: center;
`;
