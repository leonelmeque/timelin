import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { api, dateFormatter, hooks, TodoProps } from '@todo/commons';
import {
  Chip,
  Header,
  Palette,
  Spacer,
  Text,
  TimeStatus,
} from '@todo/mobile-ui';
import { useEffect, useRef, useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import Box from '../components/atoms/Layout/Layout';
import { PlainTextInput } from '../components/plain-input';
import { CustomSafeAreaView } from '../components/safe-area-view';
import DescriptionIcon from '../../assets/icons/description-text.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import TimelineIcon from '../../assets/icons/timeline.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ShareIcon from '../../assets/icons/share.svg';
import DeleteIcon from '../../assets/icons/delete.svg';
import {
  CalendarModalView,
  CalendarRefProps,
} from '../components/calendar-modal-view';
import styled from 'styled-components';

type AddTodoScreenProps = {
  Params: {
    todo: TodoProps;
  };
};

const DateChip = styled(Chip)<{ colour: string }>`
  background-color: ${(props) => props.colour};
`;

const TodoScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AddTodoScreenProps>>();

  const [state, setState] = useState<TodoProps>(params.todo);

  const calendarRef = useRef<CalendarRefProps>(null);

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

  const onPressDeleteTodo = (id: string) => (e: GestureResponderEvent) => {
    api.todo
      .deleteTodo(id)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
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

  useEffect(() => {
    setState(params.todo);
  }, [params.todo]);

  const renderTodoActions = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Pressable>
        <ShareIcon width={20} height={20} />
      </Pressable>
      <Spacer size="8" />
      <Pressable onPress={onPressDeleteTodo(params.todo.id)}>
        <DeleteIcon />
      </Pressable>
    </View>
  );

  return (
    <CustomSafeAreaView>
      <CalendarModalView
        ref={calendarRef}
        onPressCancel={() => calendarRef.current?.toggleModal()}
        onPressSave={onPressSaveDate}
      />
      <Header
        renderLeftContent={() => (
          <Pressable onPress={() => navigation.goBack()}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ArrowLeft />
              <Spacer size="4" />
              <Text size="body" weight="medium">
                Back
              </Text>
            </View>
          </Pressable>
        )}
        renderRigthContent={renderTodoActions}
      />
      <ScrollView>
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
          <DescriptionIcon />
          <Spacer size="8" />
          <View>
            <PlainTextInput
              size="body"
              weight="500"
              multiline
              textAlignVertical="top"
              placeholder="Add a description"
              value={state.description}
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
          <CalendarIcon />
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
          <TimelineIcon />
          <Spacer size="8" />
          <Text size="body" weight="medium" colour={Palette.primary.P300}>
            + Add new timeline update
          </Text>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CalendarIcon />
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
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default TodoScreen;
