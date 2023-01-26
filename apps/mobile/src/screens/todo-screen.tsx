import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { hooks, TodoProps } from '@todo/commons';
import { Chip, Header, Palette, Spacer, Text } from '@todo/mobile-ui';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Box from '../components/atoms/Layout/Layout';
import { PlainTextInput } from '../components/plain-input';
import { CustomSafeAreaView } from '../components/safe-area-view';
import DescriptionIcon from '../../assets/icons/description-text.svg';
import CalendarIcon from '../../assets/icons/calendar.svg';
import TimelineIcon from '../../assets/icons/timeline.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import ShareIcon from '../../assets/icons/share.svg';
import DeleteIcon from '../../assets/icons/delete.svg';

type AddTodoScreenProps = {
  Params: {
    todo: TodoProps;
  };
};

const TodoScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute<RouteProp<AddTodoScreenProps>>();
  const [state, setState] = useState<TodoProps>(params.todo);

  const onFormChange = (value: string, inputName: string) => {
    setState({
      ...state,
      [inputName]: value,
    });
  };

  hooks.useUpdateTodo(state);

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
      <Pressable>
        <DeleteIcon />
      </Pressable>
    </View>
  );

  return (
    <CustomSafeAreaView
      style={{
        flex: 1,
        backgroundColor: Palette.neutrals.white,
      }}
    >
      {/* <StatusBar auto /> */}

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
          <Chip label="Has not started" isActive />
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
          <Chip label="No deadline" isActive />
        </Box>
        <Spacer size="8" />
      </ScrollView>
    </CustomSafeAreaView>
  );
};

export default TodoScreen;
