import React, { FC, ReactNode, useRef, useState } from "react";
import { Box, Caption, Input, Spacer, Text } from "../../atoms";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dimensions,
  Modal,
  Pressable,
  PressableProps,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  Container,
  CountryCode,
  DropdownList,
  SelectedIcon,
  StyledDropdownListItem,
} from "./styles";
import { CustomSafeAreaView } from "../../../components/safe-area-view";
import { useTheme } from "styled-components";

type CountriesList = {
  dialcode: number | string;
  label: string;
  code?: string;
};

interface PhoneInputProps extends Omit<TextInputProps, "onChangeText"> {
  dropdownList: CountriesList[];
  dialcode: string;
  code: string;
  number: string;
  onSelectCountryCode?: (dialcode: string) => void;
  onNumberChange?: (number: string) => void;
  success?: boolean;
  hasError?: boolean;
}

export const DropdownListItem = ({
  selected = false,
  children,
  ...rest
}: PressableProps & { selected?: boolean; children: ReactNode }) => (
  <StyledDropdownListItem selected={selected} {...rest}>
    {children}
    {selected && <SelectedIcon />}
  </StyledDropdownListItem>
);

export const PhoneInput: FC<PhoneInputProps> = ({
  dropdownList,
  dialcode = "+1",
  code = "US",
  number,
  onSelectCountryCode = () => { },
  onNumberChange = () => { },
  ...rest
}) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<TextInput>(null);
  const theme = useTheme();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSearchCountry = (value: string) => {
    setSearch(value);
  };

  const filteredList = dropdownList.filter(
    (item: any) =>
      item.label.toLocaleLowerCase().indexOf(search.toLowerCase()) > -1
  );

  return (
    <Container>
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={handleToggle}>
          <CountryCode>
            <Text size="body">{dialcode}</Text>
            <Text size="body">
              {" "}
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </Text>
          </CountryCode>
        </Pressable>
        <Spacer size="4" />
        <Input
          ref={inputRef}
          style={{ flex: 1 }}
          keyboardType="numeric"
          autoFocus
          value={number}
          onChangeText={onNumberChange}
          {...rest}
        />
      </View>
      <Spacer size="8" />
      <View
        style={{
          maxHeight: Dimensions.get("screen").height / 2,
        }}
      >
        <Modal visible={toggle} animationType="slide">
          <CustomSafeAreaView>
            <Spacer size="8" />
            <Box
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable onPress={handleToggle}>
                <Text
                  size="body"
                  weight="medium"
                  style={{ color: theme.colours.danger.D300 }}
                >
                  Cancel
                </Text>
              </Pressable>
              <Text size="body" weight="bold">
                Select country
              </Text>
            </Box>
            <Spacer size="8" />
            <Box>
              <Input
                style={{
                  backgroundColor: "#f6f6f7",
                  borderRadius: 16,
                  borderColor: "transparent",
                }}
                placeholder="Search country"
                onChangeText={handleSearchCountry}
              />
            </Box>
            <Spacer size="8" />
            <DropdownList
              data={filteredList || dropdownList}
              ItemSeparatorComponent={() => <Spacer size="8" />}
              renderItem={({ item, index }: any) => (
                <DropdownListItem
                  selected={code === item.code}
                  key={index}
                  onPress={() => {
                    onSelectCountryCode(item.code as string);
                    setSearch("");
                    handleToggle();
                    inputRef.current?.focus();
                  }}
                >
                  <Text weight="medium" size="body">
                    {item.label} ({item.dialcode})
                  </Text>
                </DropdownListItem>
              )}
            />
          </CustomSafeAreaView>
        </Modal>
      </View>
    </Container>
  );
};
