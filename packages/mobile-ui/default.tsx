import React from 'react';
import { hooks, theme } from '@todo/commons';
import { ThemeProvider } from 'styled-components/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text, Spacer } from './src';
import { ButtonPage } from './src/presentations/pages/button-page';
import { Container } from './src/presentations/components/container';
import { InputPage } from './src/presentations/pages/input-page';

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
                <ButtonPage />
                <TypographyScreen />
                <InputPage />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemeProvider>
  );
};
