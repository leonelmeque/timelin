import { Button, Spacer } from '@todo/mobile-ui';
import { Modal, GestureResponderEvent, Dimensions } from 'react-native';
import Box from '../atoms/Layout/Layout';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components/native';

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
  height: ${Dimensions.get('screen').height};
  width: ${Dimensions.get('screen').width};
`;

const CalendarModalViewComponent = (
  { onPressCancel, onPressSave }: CalendarModalViewProps,
  ref: ForwardedRef<CalendarRefProps>
) => {
  const [_date, _setDate] = useState<Date | undefined>(new Date());

  const [name, setName] = useState<string>('');
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    date: _date,
    toggleModal: () => {
      setModalVisibility(!modalVisibility);
    },
    visibility: modalVisibility,
    setFormName: (value: string) => {
      setName(value);
    },
    name,
  }));

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    _setDate(date);
  };

  return (
    <Modal visible={modalVisibility} transparent>
      <PressableOverlay
        onPress={() => {
          setModalVisibility(!modalVisibility);
        }}
      ></PressableOverlay>
      <CalendarContainer>
        <RNDateTimePicker
          mode="date"
          onChange={onChangeDate}
          value={_date as Date}
          display="inline"
        />
        <Spacer size="4" />
        <ActionsContainer>
          <Button
            label="Cancel"
            size="md"
            variant="tertiary"
            onPress={onPressCancel}
          />

          <Button
            label="save"
            size="md"
            variant="primary"
            onPress={onPressSave}
          />
        </ActionsContainer>
      </CalendarContainer>
    </Modal>
  );
};

export const CalendarModalView = forwardRef(CalendarModalViewComponent);
CalendarModalView.displayName = 'CalendarModalView';
