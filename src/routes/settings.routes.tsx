import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screens/settings-screen';
import { Stack } from './constants';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const SettingsStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={SettingsScreen} name="Settings/Default" />
    </Stack.Group>
  </Stack.Navigator>
);

export default SettingsStack;