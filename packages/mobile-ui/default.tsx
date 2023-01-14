import React from 'react';
import { hooks, theme } from '@todo/commons';
import styled, { ThemeProvider } from 'styled-components/native';
import { SafeAreaView, ScrollView } from 'react-native';
import { Button, Text } from './src';

const Container = styled.View`
  padding: 16px;
`;

const Spacer = styled.View<{ size?: number }>`
  padding: ${(props) => (props.size ? props.size * 2 : 4)}px;
`;

const ButtonsScreen = () => (
  <Container>
    <Text size="heading" weight="bold">
      Buttons
    </Text>
    <Spacer size={4} />
    <Button label="Primary large" size="lg" variant="primary" />
    <Spacer size={8} />
    <Button label="Button" size="sm" variant="primary" />
  </Container>
);

const TypographyScreen = () => (
  <Container>
    <Text size="heading" weight="bold">
      Typography
    </Text>
    <Spacer size={4} />
    <Text size="heading" weight="bold">
      Heading Text
    </Text>
    <Spacer size={4} />
    <Text size="large" weight="bold">
      Large Text
    </Text>
    <Spacer size={4} />
    <Text size="body">Body Text</Text>
    <Spacer size={4} />
    <Text size="small">Small Text</Text>
  </Container>
);

export const Default = () => {
  const { useThemeSwitcher } = hooks;
  const [selectedTheme] = useThemeSwitcher();

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ButtonsScreen />
          <TypographyScreen />
        </ScrollView>
      </SafeAreaView>
    </ThemeProvider>
  );
};
