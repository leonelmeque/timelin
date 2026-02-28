import { Modal, GestureResponderEvent, Dimensions, Platform, TextInput, Pressable, View } from 'react-native';
import { Ref, useImperativeHandle, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';

type CalendarModalViewProps = {
  onPressCancel: (e?: GestureResponderEvent) => void;
  onPressSave: (e?: GestureResponderEvent) => void;
};

export type CalendarRefProps = {
  date: Date | undefined;
  toggleModal: () => void;
  visibility: boolean;
  setFormName: (value: string) => void;
  name: string;
};

function WebDatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const formatted = value.toISOString().split('T')[0];
  return (
    <View className={cn("px-4 p-4 items-center")}>
      <Text className="font-bold">Select Date</Text>
      <View className="h-4" />
      {Platform.OS === 'web' ? (
        <input
          type="date"
          value={formatted}
          onChange={(e) => {
            const d = new Date(e.target.value + 'T00:00:00');
            if (!isNaN(d.getTime())) onChange(d);
          }}
          style={{
            fontSize: 16, padding: 8, borderRadius: 6,
            border: '1px solid #E3E2DE', width: '100%', maxWidth: 300,
          }}
        />
      ) : (
        <TextInput
          value={formatted}
          onChangeText={(text) => {
            const d = new Date(text);
            if (!isNaN(d.getTime())) onChange(d);
          }}
          placeholder="YYYY-MM-DD"
          style={{ fontSize: 16, padding: 8, borderWidth: 1, borderColor: '#E3E2DE', borderRadius: 6 }}
        />
      )}
    </View>
  );
}

function NativeDatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const RNDateTimePicker = require('@react-native-community/datetimepicker').default;
  return (
    <RNDateTimePicker
      mode="date"
      onChange={(_: any, date?: Date) => { if (date) onChange(date); }}
      value={value}
      display="inline"
    />
  );
}

export const CalendarModalView = ({
  onPressCancel,
  onPressSave,
  ref,
}: CalendarModalViewProps & { ref?: Ref<CalendarRefProps> }) => {
  const [_date, _setDate] = useState<Date>(new Date());
  const [name, setName] = useState<string>('');
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    date: _date,
    toggleModal: () => setModalVisibility(!modalVisibility),
    visibility: modalVisibility,
    setFormName: (value: string) => setName(value),
    name,
  }));

  const DatePicker = Platform.OS === 'web' ? WebDatePicker : NativeDatePicker;

  return (
    <Modal visible={modalVisibility} transparent>
      <Pressable
        onPress={() => setModalVisibility(false)}
        className={cn("absolute opacity-20 bg-grey-300")}
        style={{
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width,
        }}
      />
      <View
        className={cn("justify-end mt-auto pb-16 rounded-t-3xl px-4 bg-neutrals-white")}
      >
        <DatePicker value={_date} onChange={_setDate} />
        <View className="h-2" />
        <View className={cn("justify-between flex-row px-4")}>
          <Button size="default" variant="ghost" onPress={onPressCancel}>
            <Text>Cancel</Text>
          </Button>
          <Button size="default" variant="default" onPress={onPressSave}>
            <Text>Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

CalendarModalView.displayName = 'CalendarModalView';
