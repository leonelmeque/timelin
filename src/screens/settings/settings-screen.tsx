import React from 'react';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { Header } from '../../ui/organisms';
import { Box, Spacer, Text, Toggle } from '../../ui/atoms';
import { SettingsButton } from '../../ui/organisms/settings-button';
import { Pressable, ScrollView } from 'react-native';
import { AvatarWithText } from '../../components/avatar-with-text';
import { User, api } from '../../lib';
import { useUserContext } from '../../context';
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen = () => {
  const [user, dispatch] = useUserContext();
  const { avatar, fullname } = user as User;
  const navigation = useNavigation();

  const handleNavigation = (path: string) => {
    switch (path) {
      case 'profile':
        //@ts-ignore
        navigation.navigate('Settings/Profile'); break
      case 'account':
        //@ts-ignore
        navigation.navigate('Settings/Account'); break
      default:
        return null;
    }
  };

  const headerLeftContent = () => (
    <Text size="heading" weight="bold">
      Settings
    </Text>
  );

  const handleToggleNotifications = async () => {
    return Promise.resolve();
  };

  const handleSignOut = async () => {
    await api.users.userSignOut();
    dispatch(null);
  };

  return (
    <CustomSafeAreaView>
      <Header renderLeftContent={headerLeftContent} />
      <ScrollView>
        <Box>
          <Spacer size="8" />
          <AvatarWithText
            name={fullname as string}
            role="Senior Product Designer"
            profilePicture={avatar}
          />
          <Spacer size="16" />
          <Pressable onPress={() => handleNavigation('profile')}>
            <SettingsButton
              iconName="person-outline"
              settingName="Profile"
              description="Update your profile information."
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable onPress={() => handleNavigation('account')}>
            <SettingsButton
              iconName="add"
              settingName="Account"
              description="Change your password or delete your account."
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable>
            <SettingsButton
              iconName="notifications-none"
              settingName="Notifications"
              description="Stay up-to-date with changes."
              rightContent={
                <Toggle isOn onToggle={handleToggleNotifications} />
              }
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable>
            <SettingsButton
              iconName="language"
              settingName="Language"
              description="Choose your prefered language"
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable>
            <SettingsButton iconName="info-outline" settingName="About us" />
          </Pressable>
          <Spacer size="16" />
          <Pressable onPress={handleSignOut}>
            <SettingsButton iconName="logout" settingName="Log out" />
          </Pressable>
          <Spacer size="16" />
        </Box>
      </ScrollView>
    </CustomSafeAreaView>
  );
};
