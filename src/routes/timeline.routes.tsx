import { TimelineScreen } from '../screens/timeline-screen';
import { Stack } from './constants';
import { EventScreen } from '../screens/event-screen';
import { AddEventModalView } from '../components/add-event-modal-view';

const TimelineStack = () => (
  <Stack.Group
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen component={TimelineScreen} name="Timeline/Default" />
    <Stack.Screen
      component={AddEventModalView}
      name="Timeline/AddEvent"
      options={{ presentation: 'transparentModal', headerShown: false }}

    />
    <Stack.Screen component={EventScreen} name="Timeline/Event" />
  </Stack.Group>
);

export default TimelineStack;
