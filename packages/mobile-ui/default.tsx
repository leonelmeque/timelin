import React from 'react';
import { hooks, theme } from '@todo/commons';
import styled, { ThemeProvider } from 'styled-components/native';
import { Text, SafeAreaView } from 'react-native';
import { Button } from './src';

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const Spacer = styled.View<{ size?: number }>`
  padding: ${(props) => (props.size ? props.size * 2 : 4)}px;
`;

const ButtonsScreen = () => (
  <Container>
    <Text>Buttons</Text>
    <Spacer size={4} />
    <Button label="Primary large" size="lg" variant="primary" />
    <Spacer size={8} />
    <Button label="Button" size="sm" variant="primary" />
  </Container>
);

export const Default = () => {
  const { useThemeSwitcher } = hooks;
  const [selectedTheme] = useThemeSwitcher();
  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <SafeAreaView style={{ flex: 1 }}>
        <ButtonsScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
};
