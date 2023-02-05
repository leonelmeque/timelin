import { Spacer, Text } from '@todo/mobile-ui';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const EventBubble = styled(
  ({
    title,
    description,
    colour,
    ...rest
  }: {
    title: string;
    description: string;
    colour?: string;
  }) => {
    return (
      <View {...rest}>
        <Text size="small" weight="medium">
          {title}
        </Text>
        <Spacer size="4" />
        <Text size="small" weight="regular" numberOfLines={4}>
          {description}
        </Text>
      </View>
    );
  }
)`
  padding: ${(props) => props.theme.spacing.size8}px;
  border-radius: ${(props) => props.theme.spacing.size8}px;
  background-color: ${(props) => props.colour};
`;
