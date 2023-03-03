import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { SignupScreen } from '../screens/auth/signup-screen';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen component={SignupScreen} name="Todo/Signup" />
  </Stack.Navigator>
);

export default AuthStack