import { MaterialIcons } from '@expo/vector-icons';
import { TimelineEventProps } from '@todo/commons';
import {
  Spacer,
  Box,
  PlainTextInput,
  Palette,
  Chip,
} from '@todo/mobile-ui';
import { ScrollView, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { CalendarModalView } from '../calendar-modal-view';
import { useEventView } from './use-event-view';

const DateChip = styled(Chip) <{ colour: string }>`
  background-color: ${(props) => props.colour};
`;

export const EventView = ({
  event,
  todoUID,
}: {
  event: TimelineEventProps | null;
  todoUID: string;
}) => {
  const {
    state,
    onFormChange,
    onPressSaveDate,
    calendarRef,
    onPressToggleModalVisibility,
    timestamp,
  } = useEventView({
    event,
    todoUID,
  });

  return (
    <>
      <CalendarModalView
        ref={calendarRef}
        onPressCancel={() => calendarRef.current?.toggleModal()}
        onPressSave={onPressSaveDate}
      />
      <ScrollView>
        <Spacer size="8" />
        <Box
          style={{
            paddingLeft: 56,
          }}
        >
          <PlainTextInput
            size="large"
            weight="500"
            multiline
            value={state?.title}
            onChangeText={(value) => onFormChange(value, 'title')}
            scrollEnabled={false}
            placeholder="Add a title"
            autoFocus
          />
        </Box>
        <Spacer size="4" />
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="description" size={24} />
          <Box>
            <PlainTextInput
              size="body"
              weight="500"
              multiline
              textAlignVertical="top"
              placeholder="Add a description"
              value={state?.description}
              scrollEnabled={false}
              onChangeText={(value) => onFormChange(value, 'description')}
            />
          </Box>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <Spacer size="8" />
          <Pressable onPress={() => onPressToggleModalVisibility('timestamp')}>
            <DateChip
              label={timestamp}
              isActive
              colour={
                !state?.timestamp ? Palette.primary.P50 : Palette.success.S50
              }
            />
          </Pressable>
        </Box>
        <Spacer size="16" />
      </ScrollView>
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      ></Box>
    </>
  );
};
