import React, { useEffect, useState } from 'react';
import { hooks, theme } from '@todo/commons';
import styled, { ThemeProvider } from 'styled-components/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Text, Spacer, Input, FormInput } from './src';

const Container = styled.View`
  padding: 16px;
`;

const ButtonsScreen = () => (
  <Container>
    <Text size="heading" weight="bold">
      Buttons
    </Text>
    <View>
      <Spacer size={'4'} />
      <Button label="Primary large" size="lg" variant="primary" />
      <Spacer size={'8'} />
      <Button label="Button" size="md" variant="primary" />
      <Spacer size={'8'} />
      <Button label="Button" size="sm" variant="primary" />
    </View>
  </Container>
);

const TypographyScreen = () => (
  <Container>
    <Text size="heading" weight="bold">
      Typography
    </Text>
    <Spacer size={'4'} />
    <Text size="heading" weight="bold">
      Heading Text
    </Text>
    <Spacer size={'4'} />
    <Text size="large" weight="bold">
      Large Text
    </Text>
    <Spacer size={'4'} />
    <Text size="body">Body Text</Text>
    <Spacer size={'4'} />
    <Text size="small">Small Text</Text>
  </Container>
);

const InputScreen = () => {
  const [form, setForm] = useState<{ [key: string]: any }>({});

  const onFormChange = ({ name, value }: { name: string; value: string }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Container>
      <Text size="heading" weight="bold">
        Input
      </Text>
      <Spacer size={'4'} />
      <Input placeholder="Placeholder" value="Input has text" />
      <Spacer size={'4'} />
      <Input placeholder="Default state" />
      <Spacer size={'4'} />
      <Input
        value={form?.form1 || ''}
        placeholder="Error State"
        hasError={!form.form1?.length}
        onChangeText={(val) => onFormChange({ name: 'form1', value: val })}
      />
      <Spacer size={'4'} />
      <Input placeholder="Disabled state" numberOfLines={5} disabled editable />
      <Spacer size={'16'} />
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
};

export const Default = () => {
  const { useThemeSwitcher } = hooks;
  const [selectedTheme] = useThemeSwitcher();

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <ButtonsScreen />
                <TypographyScreen />
                <InputScreen />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  );
};
