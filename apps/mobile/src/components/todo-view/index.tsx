import { MaterialIcons } from '@expo/vector-icons';
import { dateFormatter, hooks, TodoProps } from '@todo/commons';
import {
  Badge,
  Box,
  Button,
  Chip,
  Palette,
  PlainTextInput,
  Spacer,
  Text,
  TimeStatus,
} from '@todo/mobile-ui';
import { useRef, useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { CalendarModalView, CalendarRefProps } from '../calendar-modal-view';
import { TimelineCompactView } from '../timeline-view/compact-view';
import {
  UpdateStatusModalRefProps,
  UpdateStatusModalView,
} from '../update-status-modal-view';

const DateChip = styled(Chip) <{ colour: string }>`
  background-color: ${(props) => props.colour};
`;

export const TodoView = ({ todo }: any) => {
  const [state, setState] = useState<TodoProps>(todo);
  const calendarRef = useRef<CalendarRefProps>(null);

  const todoStatusRef = useRef<UpdateStatusModalRefProps>(null);

  const dateStartLabel = !state.startDate
    ? 'Has not started'
    : dateFormatter(state.startDate);

  const dateEndLabel = !state.endDate
    ? 'Has not started'
    : dateFormatter(state.endDate);

  const onFormChange = (value: string, inputName: string) => {
    setState({
      ...state,
      [inputName]: value,
    });
  };

  const handleUpdateStatus = (value: string) => {
    onFormChange(value, 'status');
  };

  const onPressToggleModalVisibility = (name: string) => {
    calendarRef.current?.toggleModal();
    calendarRef.current?.setFormName(name);
  };

  const onPressSaveDate = () => {
    const { date, name, toggleModal } = calendarRef.current || {};
    onFormChange(String(date), name || '');
    if (toggleModal) toggleModal();
  };

  hooks.useUpdateTodo(state);

  return (
    <>
      <CalendarModalView
        ref={calendarRef}
        onPressCancel={() => calendarRef.current?.toggleModal()}
        onPressSave={onPressSaveDate}
      />
      <UpdateStatusModalView
        onSelect={handleUpdateStatus}
        ref={todoStatusRef}
        initialSelection={state.status}
      />
      <ScrollView>
        <Spacer size="8" />
        <Box
          style={{
            paddingLeft: 56,
          }}
        >
          {state.startDate && state.endDate && (
            <TimeStatus endDate={state.endDate} status={state.status} />
          )}
          <PlainTextInput
            size="large"
            weight="500"
            value={state.todo}
            onChangeText={(value) => onFormChange(value, 'todo')}
            scrollEnabled={false}
          />
        </Box>
        <Spacer size="4" />
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 16,
          }}
        >
          <MaterialIcons name="description" size={24} />
          <Spacer size="8" />
          <View>
            <PlainTextInput
              size="body"
              weight="500"
              multiline
              textAlignVertical="top"
              placeholder="Add a description"
              value={state.description}
              scrollEnabled={false}
              onChangeText={(value) => onFormChange(value, 'description')}
            />
          </View>
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
          <Pressable onPress={() => onPressToggleModalVisibility('startDate')}>
            <DateChip
              label={dateStartLabel}
              isActive
              colour={
                !state.startDate ? Palette.primary.P50 : Palette.success.S50
              }
            />
          </Pressable>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name="timeline" size={24} />
          <Spacer size="8" />
          <View>
            <Pressable
              onPress={() => {
                //@ts-ignore
                navigation.navigate<any>('Todo/Timeline', { id: state.id });
              }}
            >
              <TimelineCompactView id={state.id} />
            </Pressable>

            <Pressable
              onPress={() => {
                //@ts-ignore
                navigation.navigate<any>('Todo/Timeline', { id: state.id });
              }}
            >
              <Text size="body" weight="medium" colour={Palette.primary.P300}>
                + Add new timeline update
              </Text>
            </Pressable>
          </View>
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
          <Pressable onPress={() => onPressToggleModalVisibility('endDate')}>
            <DateChip
              label={dateEndLabel}
              isActive
              colour={
                !state.endDate ? Palette.primary.P50 : Palette.warning.W50
              }
            />
          </Pressable>
        </Box>
        <Spacer size="8" />
        <Box
          style={{
            flexDirection: 'row',
            paddingLeft: 56,
          }}
        >
          <Badge type="colored" status={state.status} />
        </Box>
      </ScrollView>
      <Box
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onPress={() => {
            todoStatusRef.current?.toggleModalVisibility();
          }}
          label="Update Progress"
          variant="tertiary"
          size="md"
        />
      </Box>
    </>
  );
};
