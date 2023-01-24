import { useState } from 'react';
import {
  Modal,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, ButtonProps } from '../../atoms/button';
import { _variants as buttonVariants } from '../../atoms/button/styles';
import { Palette } from '../../atoms/palette';
import { Spacer } from '../../atoms/spacer';
import { Text } from '../../atoms/typography';
import { Container } from '../components/container';
import { HorizontalLayout } from '../components/horizontal-layout';

const toRender = {
  default: [
    {
      label: 'Default',
      size: 'lg',
    },
  ],
  size: [
    {
      label: 'Large',
      size: 'lg',
    },
    {
      label: 'Medium',
      size: 'md',
    },
    {
      label: 'Small',
      size: 'sm',
    },
  ],
};

export const ButtonPage = () => {
  const variants = Object.keys(buttonVariants(false)).map((key) => key);

  const [variant, setVariant] = useState('primary');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <Container>
            <Text size="heading" weight="bold">
              Button settings
            </Text>
          </Container>
          <View style={{ flex: 1 }}>
            {variants.map((_var) => (
              <TouchableHighlight
                style={{
                  padding: 16,
                }}
                underlayColor={Palette.primary.P50}
                onPress={() => {
                  setVariant(_var);
                  setIsOpen(!isOpen);
                }}
              >
                <Text size="body" weight="regular">
                  {_var.substring(0, 1).toUpperCase() +
                    _var.substring(1, _var.length)}
                </Text>
              </TouchableHighlight>
            ))}
          </View>
        </SafeAreaView>
      </Modal>

      <Container>
        <Text size="large" weight="bold">
          Buttons
        </Text>
        <Text size="body" weight="regular">
          Here you will find the buttons that existings within the timeline
          application, these buttons can be use in several parts of the
          application.
        </Text>
        <Spacer size={'4'} />
        {Object.entries(toRender).map(([key, values], index) => (
          <>
            <HorizontalLayout>
              <Text size="large" weight="medium">
                {key.substring(0, 1).toUpperCase() +
                  key.substring(1, key.length)}
              </Text>
              {index === 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  <Text size="small" weight="medium">
                    Select Variant
                  </Text>
                </TouchableOpacity>
              )}
            </HorizontalLayout>
            {values.map(({ label, size }) => (
              <>
                <Spacer size={'4'} />
                <HorizontalLayout>
                  <Text size="small" weight="medium">
                    {label.substring(0, 1).toUpperCase() +
                      label.substring(1, label.length)}
                  </Text>
                  <Button
                    label={label}
                    size={(size as ButtonProps['size']) || 'lg'}
                    variant={variant as ButtonProps['variant']}
                  />
                </HorizontalLayout>
                <Spacer size={'8'} />
              </>
            ))}
          </>
        ))}
      </Container>
    </>
  );
};
