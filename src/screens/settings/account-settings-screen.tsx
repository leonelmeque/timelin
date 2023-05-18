import { useTheme } from 'styled-components/native';
import { LeftArrowWithTextButton } from '../../components/back-button';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { Box, Spacer } from '../../ui/atoms';
import { Header } from '../../ui/organisms';
import { SettingsButton } from '../../ui/organisms/settings-button';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

const RemoveAccountButton = styled(SettingsButton)`
  background-color: ${({ theme }) => theme.colours.danger.D50};
`;

export const AccountSettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <LeftArrowWithTextButton
            text="Back"
            onPress={() => navigation.goBack()}
            colour={theme.colours.neutrals.dark}
          />
        )}
      />
      <Spacer size="16" />
      <Box>
        <Pressable
          onPress={() =>
            navigation.navigate('Settings/Account-Modal', {
              value: 'change-password',
            })
          }
        >
          <SettingsButton
            iconName="lock"
            settingName="Change password"
            description="Update your current password"
          />
        </Pressable>
        <Spacer size="16" />
        <Pressable
          onPress={() =>
            navigation.navigate('Settings/Delete-Account', {
              value: 'delete-account',
            })
          }
        >
          <RemoveAccountButton
            iconName="delete"
            settingName="Delete account"
            description="Permanently delete your account"
          />
        </Pressable>
      </Box>
    </CustomSafeAreaView>
  );
};
