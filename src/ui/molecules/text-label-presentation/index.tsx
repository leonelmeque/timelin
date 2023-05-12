import { FC } from 'react';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';
import { Spacer, Text } from '../../atoms';

type TextLabelPresentationProps = {
  label: string;
  value?: string;
};

export const Container = styled.View`
  padding: 16px;
  background-color: rgba(232, 232, 232, 0.2);
  border-radius: 8px;
`;

export const TextLabelPresentation: FC<TextLabelPresentationProps> = ({
  label,
  value,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <Text size="small">{label}</Text>
      <Spacer size="4" />
      <Text size="body" weight="bold" colour={theme.colours.greys.G75}>
        {value}
      </Text>
    </Container>
  );
};
