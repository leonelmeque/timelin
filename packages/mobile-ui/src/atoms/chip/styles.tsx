import styled from 'styled-components/native';

export const Container = styled.View<{ colour: string }>`
  background-color: ${(props) => props.colour};
  padding: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
