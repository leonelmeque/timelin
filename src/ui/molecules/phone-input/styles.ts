import styled from 'styled-components/native';

export const Container = styled.View``;

export const CountryCode = styled.View`
  padding: 16px;
  border: 1.35px solid ${(props) => props.theme.colours.neutrals.dark};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const DropdownList = styled.FlatList`
  padding: ${(props) => props.theme.spacing.size16}px;
  box-shadow: ${(props) => props.theme.shadow.L4};
  background-color: ${(props) => props.theme.colours.neutrals.white};
  border-radius: ${(props) => props.theme.spacing.size16}px;
`;

export const StyledDropdownListItem = styled.Pressable<{ selected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.size24}px;
  background-color: ${props => !props.selected ? props.theme.colours.neutrals.white : props.theme.colours.primary.P50};
  border-radius: ${(props) => props.theme.spacing.size8}px;
`;

export const SelectedIcon = styled.View`
  width: ${(props) => props.theme.spacing.size16}px;
  height: ${(props) => props.theme.spacing.size16}px;
  background-color: ${(props) => props.theme.colours.primary.P100};
  border-radius: ${(props) => props.theme.spacing.size16}px;
  border-width: 2px;
  border-color: ${(props) => props.theme.colours.greys.G300};
`;
