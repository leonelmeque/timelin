import { FC } from 'react';
import { useForm } from '../../hooks/use-form';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
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
      <Text className="font-medium">
        <>{dateFormatter(values.dateOfBirth, { dateStyle: 'short' })}</>
      </Text>
      <View className="h-8" />
      <RNDateTimePicker
        mode="date"
        onChange={onChangeDate}
        value={new Date(values.dateOfBirth)}
        display="inline"
      />
      <Text className="text-sm text-grey-200">The day your were born</Text>
      <View className="h-32" />
      <Button
        variant="default"
        size="lg"
        onPress={() => onSubmit(Number(values.dateOfBirth))}
      >
        <Text>Update birthday</Text>
      </Button>
    </>
  );
};
