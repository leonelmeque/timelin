import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/auth/signin-screen';
import { SignupScreen } from '../screens/auth/signup-screen';

const Stack = createNativeStackNavigator();

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={options} initialRouteName="Todo/Signin">
    <Stack.Screen component={SignInScreen} name="Todo/Signin" />
    <Stack.Screen component={SignupScreen} name="Todo/Signup" />
  </Stack.Navigator>
);

export default AuthStack;
