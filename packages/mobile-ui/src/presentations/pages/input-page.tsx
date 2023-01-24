import { Input } from '../../atoms/input';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import { useForm } from '../../helpers/useForm';
import { FormInput } from '../../molecules/form-input';
import { Container } from '../components/container';

const SimpleInputList = () => {
  const { form, onFormChange } = useForm();
  return (
    <Container>
      <Text size="large" weight="bold">
        Input
      </Text>
      <Text size="body" weight="regular">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum pariatur
        reiciendis excepturi quis, dignissimos nesciunt aut molestias
        aspernatur, culpa numquam maiores placeat, minus ratione! Dolore nemo
        labore ab saepe consequatur?
      </Text>

      <Spacer size={'4'} />
      <Input placeholder="Placeholder" value="Input has text" />
      <Spacer size={'4'} />
      <Input placeholder="Default state" />
      <Spacer size={'4'} />
      <Input
        value={form?.errorState || ''}
        placeholder="Error State"
        hasError={!form.errorState?.length}
        onChangeText={(val) => onFormChange({ name: 'errorState', value: val })}
      />
      <Spacer size={'4'} />
      <Input placeholder="Disabled state" numberOfLines={5} disabled editable />
    </Container>
  );
};

const FormInputList = () => (
  <Container>
    <FormInput label="Label" />
    <Spacer size={'8'} />
    <FormInput
      placeholder="mail@domain.com"
      label="Email"
      captionText="We will never share your email"
      variant="caption"
      keyboardType="email-address"
    />
    <Spacer size={'8'} />
    <FormInput
      label="Username"
      value="jhon_doe"
      captionText="Your user must not contain special characters"
      variant="success"
      errorText="Please add a valid user name."
      successText="Nice work"
    />
    <Spacer size={'8'} />
    <FormInput
      label="Username"
      value="app"
      captionText="Your user must not contain special characters"
      variant="error"
      errorText="Please add a valid user name."
    />
  </Container>
);

export const InputPage = () => {
  return (
    <>
      <SimpleInputList />
      <FormInputList />
    </>
  );
};
