import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSessionToken = async () => {
  const token = await AsyncStorage.getItem("sessionToken");
  return token
}

export const removeSessionToken = async () => {
  const token = await AsyncStorage.removeItem("sessionToken");
  return token
}