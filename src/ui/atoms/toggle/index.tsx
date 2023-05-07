import { FC, useState } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

type ToggleProps = {
  isOn: boolean;
  onToggle: () => Promise<void>;
};

const Container = styled.Pressable`
  background-color: ${(props) => props.theme.colours.neutrals.white};
  width: 53px;
  height: 28px;
  border-radius: 9999999px;
  justify-content: center;
`;

const Slider = styled.View<{
  isOn: boolean;
}>`
  width: 24px;
  height: 24px;
  background-color: ${(props) =>
    props.isOn
      ? props.theme.colours.success.S200
      : props.theme.colours.greys.G50};
  border-radius: 9999999px;
  align-self: ${(props) => (props.isOn ? 'flex-end' : 'flex-start')};
  margin-horizontal: 2px;
`;

const InsetShadown = StyleSheet.create({
  insetShadow: {
    shadowColor: '#000',
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});

export const Toggle: FC<ToggleProps> = ({
  isOn,
  onToggle = () => Promise.resolve(),
}) => {
  const [state, setState] = useState(isOn);

  const handleToggle = (e: GestureResponderEvent) => {

    onToggle()
      .then(() => {
        setState(!state);
      })
      .catch((err) => { });
  };

  return (
    <Container style={InsetShadown.insetShadow} onPress={handleToggle}>
      <Slider isOn={state} />
    </Container>
  );
};
