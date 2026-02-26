import { Modal, GestureResponderEvent, Dimensions, Platform, TextInput } from 'react-native';
import { Ref, useImperativeHandle, useState } from 'react';
import styled from 'styled-components/native';
import { Box, Button, Spacer, Text } from '../../ui/atoms';

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

const CalendarContainer = styled(Box)`
  background-color: ${(props) => props.theme.colours.neutrals.white};
  justify-content: flex-end;
  margin-top: auto;
  padding-bottom: 64px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

const ActionsContainer = styled(Box)`
  justify-content: space-between;
  flex-direction: row;
`;

const PressableOverlay = styled.Pressable`
  background-color: ${(props) => props.theme.colours.greys.G300};
  opacity: 0.2;
  position: absolute;
  height: ${Dimensions.get('screen').height}px;
  width: ${Dimensions.get('screen').width}px;
`;

function WebDatePicker({ value, onChange }: { value: Date; onChange: (d: Date) => void }) {
  const formatted = value.toISOString().split('T')[0];
  return (
    <Box style={{ padding: 16, alignItems: 'center' }}>
      <Text size="body" weight="bold">Select Date</Text>
      <Spacer size="8" />
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
    </Box>
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
      <PressableOverlay onPress={() => setModalVisibility(false)} />
      <CalendarContainer>
        <DatePicker value={_date} onChange={_setDate} />
        <Spacer size="4" />
        <ActionsContainer>
          <Button label="Cancel" size="md" variant="tertiary" onPress={onPressCancel} />
          <Button label="Save" size="md" variant="primary" onPress={onPressSave} />
        </ActionsContainer>
      </CalendarContainer>
    </Modal>
  );
};

CalendarModalView.displayName = 'CalendarModalView';
