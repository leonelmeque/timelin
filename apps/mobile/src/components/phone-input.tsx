import { FC, ReactNode, useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import CountryFlag from "react-native-country-flag";
import { CustomSafeAreaView } from "./safe-area-view";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";

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

const DropdownListItem = ({
  selected = false,
  children,
  ...rest
}: { selected?: boolean; children: ReactNode } & React.ComponentProps<typeof Pressable>) => (
  <Pressable
    className={`flex-row justify-between items-center p-6 rounded-lg ${
      selected ? "bg-primary-50" : "bg-transparent"
    }`}
    {...rest}
  >
    {children}
    {selected && (
      <View className="w-4 h-4 rounded-full bg-primary-100 border-2 border-grey-300" />
    )}
  </Pressable>
);

export const PhoneInput: FC<PhoneInputProps> = ({
  dropdownList,
  dialcode = "+1",
  code = "US",
  number,
  onSelectCountryCode = () => {},
  onNumberChange = () => {},
  ...rest
}) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<TextInput>(null);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const filteredList = dropdownList.filter(
    (item: any) =>
      item.label.toLocaleLowerCase().indexOf(search.toLowerCase()) > -1
  );

  return (
    <View>
      <View className="flex-row">
        <Pressable onPress={handleToggle}>
          <View className="p-4 flex-row items-center rounded border border-neutrals-dark">
            <Text>{dialcode}</Text>
            <Text>
              {" "}
              <MaterialIcons name="arrow-drop-down" size={24} color="black" />
            </Text>
          </View>
        </Pressable>
        <View className="w-1" />
        <View className="flex-1">
          <Input
            ref={inputRef}
            keyboardType="numeric"
            autoFocus
            value={number}
            onChangeText={onNumberChange}
          />
        </View>
      </View>
      <View className="h-2" />
      <View style={{ maxHeight: Dimensions.get("screen").height / 2 }}>
        <Modal visible={toggle} animationType="slide">
          <CustomSafeAreaView>
            <View className="h-2" />
            <View className="px-4 flex-row justify-between items-center">
              <Pressable onPress={handleToggle}>
                <Text className="font-medium text-danger-300">Cancel</Text>
              </Pressable>
              <Text className="font-bold">Select country</Text>
            </View>
            <View className="h-2" />
            <View className="px-4">
              <Input
                className="bg-grey-50 rounded-2xl border-transparent"
                placeholder="Search country"
                onChangeText={(text: string) => setSearch(text)}
              />
            </View>
            <View className="h-2" />
            <FlatList
              className="p-4 mx-4 rounded-2xl"
              style={{ backgroundColor: "rgba(232, 232, 232, 0.2)" }}
              data={filteredList || dropdownList}
              ItemSeparatorComponent={() => <View className="h-2" />}
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
                  <View className="flex-row items-center">
                    <View className="mr-2.5 rounded-full h-6 w-6 overflow-hidden relative border border-grey-75">
                      <CountryFlag
                        style={{ position: "absolute", top: 0 }}
                        isoCode={item.code}
                        size={26}
                      />
                    </View>
                    <Text className="font-medium">
                      {item.label} ({item.dialcode})
                    </Text>
                  </View>
                </DropdownListItem>
              )}
            />
          </CustomSafeAreaView>
        </Modal>
      </View>
    </View>
  );
};
