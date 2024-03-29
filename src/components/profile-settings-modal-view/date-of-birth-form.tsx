import { FC } from 'react';
import { useForm } from '../../hooks/use-form';
import { Button, Caption, Spacer, Text } from '../../ui/atoms';
import { useNavigation } from '@react-navigation/native';
import RNDateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { dateFormatter } from '../../lib/utils';

export const DateOfBirthForm: FC<{
  dateOfBirth: string;
  onSubmit: (values: number) => void;
}> = ({ dateOfBirth, onSubmit }) => {

  const {
    values,
    errors,
    handleChange: onFormChange,
  } = useForm({
    dateOfBirth: !dateOfBirth ? new Date().getTime() : Number(dateOfBirth),
  });

  //TODO: validate date of birth correctly

  const onChangeDate = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) return;
    onFormChange('dateOfBirth')(date);
  };

  return (
    <>
      <Text size="body" weight="medium">
        <>{dateFormatter(values.dateOfBirth, { dateStyle: 'short' })}</>
      </Text>
      <Spacer size="16" />
      <RNDateTimePicker
        mode="date"
        onChange={onChangeDate}
        value={new Date(values.dateOfBirth)}
        display="inline"
      />
      <Caption variant="caption" caption="The day your were born" />
      <Spacer size="64" />
      <Button
        label="Update birthday"
        variant="primary"
        size="lg"
        onPress={() => onSubmit(Number(values.dateOfBirth))}
      />
    </>
  );
};
