import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum HideTabBarNavigation {
  'Todo/View' = 'Todo/View',
  'Todo/Search' = 'Todo/Search',
  'Todo/ListTodo' = 'Todo/ListTodo',
  'Todo/Timeline' = 'Todo/Timeline',
  'Timeline/Default' = 'Timeline/Default',
  'Timeline/Event' = 'Timeline/Event',
}

export const Stack = createNativeStackNavigator();
export const Tab = createBottomTabNavigator();
