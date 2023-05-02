import styled from 'styled-components/native';

export const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 99999px;
  background-color: ${(props) => props.theme.colours.primary.P75};
`;

export const VerticalLine = styled.View<{ height?: number }>`
  width: 2px;
  flex: 1;
  align-self: stretch;
  height: ${(props) => props.height}px;
  background-color: ${(props) => props.theme.colours.primary.P50};
  position: absolute;
  left: 4px;
  top: 12px;
  z-index: -1;
`;

VerticalLine.defaultProps = {
  height: 0,
};

export const EventsDates = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;
