import { CustomSafeAreaView } from '../../components/safe-area-view';
import { Avatar, Box, Spacer, Text } from '../../ui/atoms';
import { Header } from '../../ui/organisms';
import { Pressable, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { LeftArrowWithTextButton } from '../../components/back-button';
import { TextLabelPresentation } from '../../ui/molecules/text-label-presentation';

export const ProfileSettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const headerLeftContent = () => (
    <LeftArrowWithTextButton
      onPress={() => navigation.goBack()}
      colour={theme.colours.greys.G300}
      text='Back'
    />
  );

  const handleUpdateProfileValue = (value: string) => {
    //@ts-ignore
    navigation.navigate<any>('Settings/ProfileModal', {
      value,
    });
  };

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={headerLeftContent}
        renderRigthContent={() => (
          <Text size="body" weight="bold" colour={theme.colours.greys.G300}>
            Profile
          </Text>
        )}
      />
      <ScrollView>
        <Box>
          <Avatar
            style={{ alignSelf: 'center' }}
            size={124}
            radius={8}
            source={{ uri: 'https://picsum.photos/200' }}
          />
          <Spacer size="16" />
          <Pressable onPress={() => handleUpdateProfileValue('name')}>
            <TextLabelPresentation label="Name" value="John Doe" />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => handleUpdateProfileValue('username')}>
            <TextLabelPresentation label="Username" value="johndoe" />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => handleUpdateProfileValue('role')}>
            <TextLabelPresentation
              label="Role"
              value="Senior Product Designer"
            />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => handleUpdateProfileValue('dateOfBirth')}>
            <TextLabelPresentation label="Date of birth" value="11/11/2002" />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => handleUpdateProfileValue('email')}>
            <TextLabelPresentation label="Email" value="jhondoe@domain.com" />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => handleUpdateProfileValue('phonenumber')}>
            <TextLabelPresentation label="Phone" value="+34 123 456 789" />
          </Pressable>
        </Box>
        <Spacer size="8" />
      </ScrollView>
    </CustomSafeAreaView>
  );
};
