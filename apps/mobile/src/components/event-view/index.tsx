import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Pressable, TextInput, Text } from 'react-native';
import { CalendarModalView } from '../calendar-modal-view';
import { useEventView } from './use-event-view';
import { TimelineEventProps } from '../../lib';
import { View } from 'react-native';
import { cn } from '@/lib/cn';

const DateChip = ({ colour, label, isActive }: { colour: string; label: string; isActive: boolean }) => (
  <Pressable className={cn("p-2.5 items-center justify-center rounded-lg")} style={{ backgroundColor: colour }}>
    <Text className={cn("text-sm font-medium text-gray-500")}>{label}</Text>
  </Pressable>
);

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
        <View className="h-4" />
        <View
          className={cn("px-4 pl-14")}
        >
          <TextInput
            className={cn("py-3 border border-transparent text-2xl")}
            style={{ fontWeight: '500' }}
            multiline
            value={state?.title}
            onChangeText={(value) => onFormChange(value, 'title')}
            scrollEnabled={false}
            placeholder="Add a title"
            autoFocus
          />
        </View>
        <View className="h-2" />
        <View
          className={cn("px-4 flex-row items-center")}
        >
          <MaterialIcons name="description" size={24} />
          <View className={cn("px-4")}>
            <TextInput
              className={cn("py-3 border border-transparent text-sm")}
              style={{ fontWeight: '500' }}
              multiline
              textAlignVertical="top"
              placeholder="Add a description"
              value={state?.description}
              scrollEnabled={false}
              onChangeText={(value) => onFormChange(value, 'description')}
            />
          </View>
        </View>
        <View className="h-8" />
        <View
          className={cn("px-4 p-0 flex-row items-center")}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <View className="h-4" />
          <Pressable onPress={() => onPressToggleModalVisibility('timestamp')}>
            <DateChip
              label={timestamp}
              isActive
              colour={
                !state?.timestamp ? '#F0EFF7' : '#eff7ee'
              }
            />
          </Pressable>
        </View>
        <View className="h-8" />
      </ScrollView>
      <View
        className={cn("px-4 flex-row justify-end")}
      ></View>
    </>
  );
};
