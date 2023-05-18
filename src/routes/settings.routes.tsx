import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SettingsScreen } from '../screens/settings/settings-screen';
import { Stack } from './constants';
import { ProfileSettingsScreen } from '../screens/settings/profile-settings-screen';
import { ProfileSettingsModalView } from '../components/profile-settings-modal-view';
import { AccountSettingsScreen } from '../screens/settings/account-settings-screen';
import { AccountSettingsModalView } from '../components/account-settings-modal-view';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const SettingsStack = () => (
  <Stack.Navigator screenOptions={options} initialRouteName="Settings/Default">
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={SettingsScreen} name="Settings/Default" />
      <Stack.Screen component={ProfileSettingsScreen} name="Settings/Profile" />
      <Stack.Screen
        component={ProfileSettingsModalView}
        name="Settings/ProfileModal"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen component={AccountSettingsScreen} name="Settings/Account" />
      <Stack.Screen
        component={AccountSettingsModalView}
        name="Settings/Account-Modal"
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Group>
  </Stack.Navigator>
);

export default SettingsStack;
