import { MaterialIcons } from '@expo/vector-icons';
import { Container, MiddleContent, RightContent } from './styles';
import { useTheme } from 'styled-components/native';
import { Spacer, Text } from '../../atoms';
import { ComponentProps, FC } from 'react';

type IconNames = ComponentProps<typeof MaterialIcons>['name']

type SettingsButtonProps = {
  iconName: IconNames;
  settingName: string;
  description?: string;
  withToggle?: boolean;
  rightContent?: React.ReactNode;
} & ComponentProps<typeof Container>;

export const SettingsButton: FC<SettingsButtonProps> = ({
  iconName = "america",
  settingName,
  description,
  rightContent,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <MaterialIcons
        name={iconName as any}
        size={24}
        color={theme.colours.neutrals.dark}
      />
      <MiddleContent>
        <Text size="body" weight='bold'>
          {settingName}
        </Text>
        {
          description && (
            <>
              <Spacer size='4' />
              <Text size="small">
                {description}
              </Text>
            </>
          )
        }
      </MiddleContent>
      {
        rightContent &&
        <RightContent>
          {rightContent}
        </RightContent>
      }
    </Container>
  );
};
