import styled from 'styled-components/native';
import { View, ViewProps } from 'react-native';
type SpacerProps = {
  size: '4' | '8' | '16' | '24' | '32' | '40' | '48' | '56' | '64';
  customSpace?: number;
} & ViewProps;

const SpacerWrapper = (props: SpacerProps) => <View {...props} />;

export const Spacer = styled(SpacerWrapper)<SpacerProps>`
  padding: ${(props) =>
    props.customSpace ? props.customSpace : Number(props.size) || 4}px;
`;
