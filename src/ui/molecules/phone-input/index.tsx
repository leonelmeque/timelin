import React, { FC } from 'react';
import { Input, Spacer, Text } from '../../atoms';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, TextInputProps } from 'react-native';

const Container = styled.View`
  flex-direction: row;
`;

const CountryCode = styled.View`
  padding: 16px;
  border: 1.35px solid ${(props) => props.theme.colours.neutrals.dark};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

interface PhoneInputProps extends TextInputProps {
  dropdownList: any[];
}

export const PhoneInput: FC<PhoneInputProps> = ({ ...rest }) => {
  return (
    <Container>
      <Pressable>
        <CountryCode>
          <Text size="body">🇦🇨</Text>
          <Text size="body">
            {' '}
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </Text>
        </CountryCode>
      </Pressable>
      <Spacer size="4" />
      <Input style={{ flex: 1 }} {...rest} />
    </Container>
  );
};
