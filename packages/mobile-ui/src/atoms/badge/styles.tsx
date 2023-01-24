import styled from 'styled-components/native';

export const StyledBadge = styled.View<{ bg?: string }>`
  border-radius: 9999px;
  background: ${({ theme }) => theme.colours.neutrals.white};
  padding: 4px 8px;
  align-items: center;
`;
