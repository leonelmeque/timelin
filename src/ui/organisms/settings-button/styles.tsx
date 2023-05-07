import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(240, 239, 247, .3);
  padding: 16px 12px;
  border-radius: 8px;
`;

export const MiddleContent = styled.View`
  flex: 1;
  margin-left: ${(props) => props.theme.spacing.size8}px;
`;

export const RightContent = styled.View`
  align-self: flex-end;
`;
