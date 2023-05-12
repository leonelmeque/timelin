import React from 'react';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { Header } from '../../ui/organisms';
import { Box, Spacer, Text, Toggle } from '../../ui/atoms';
import { SettingsButton } from '../../ui/organisms/settings-button';
import { Pressable, ScrollView } from 'react-native';
import { AvatarWithText } from '../../components/avatar-with-text';

export const SettingsScreen = () => {
  const headerLeftContent = () => (
    <Text size="heading" weight="bold">
      Settings
    </Text>
  );

  const handleToggleNotifications = async () => {
    return Promise.resolve()
  };

  return (
    <CustomSafeAreaView>
      <Header renderLeftContent={headerLeftContent} />
      <ScrollView>
        <Box>
          <Spacer size="8" />
          <AvatarWithText name="Jhon Doe" role="Senior Product Designer" />
          <Spacer size="16" />
          <Pressable>
            <SettingsButton
              iconName="person-outline"
              settingName="Profile"
              description="Update your profile information."
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable>
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
          <Pressable>
            <SettingsButton iconName="logout" settingName="Log out" />
          </Pressable>
          <Spacer size="16" />
        </Box>
      </ScrollView>
    </CustomSafeAreaView>
  );
};
