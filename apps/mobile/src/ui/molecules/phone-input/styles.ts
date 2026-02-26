import styled from 'styled-components/native';
import CountryFlag from "react-native-country-flag";

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
  background-color: rgba(232, 232, 232, 0.2);
  border-radius: ${(props) => props.theme.spacing.size16}px;
  padding: ${(props) => props.theme.spacing.size16}px;
  margin-left: ${(props) => props.theme.spacing.size16}px;
  margin-right: ${(props) => props.theme.spacing.size16}px;
`;

export const StyledDropdownListItem = styled.Pressable<{ selected: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing.size24}px;
  background-color: ${(props) =>
    !props.selected ? "transparent" : props.theme.colours.primary.P50};
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

export const CountryLabel = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledFlag = styled.View`
  margin-right: 10px;
  border-radius: 999999%;
  height: 24px;
  width: 24px;
  overflow: hidden;
  position: relative;
  border-width: 1px;
  border-color: ${(props) => props.theme.colours.greys.G75};
`;

const StyledCountryFlag = styled(CountryFlag)`
  position: absolute;
  top: 0%;
`;

export const Flag: typeof StyledFlag & {
  CountryFlag?: typeof StyledCountryFlag;
} = StyledFlag;

Flag.CountryFlag = StyledCountryFlag;