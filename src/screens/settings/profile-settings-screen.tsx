import { CustomSafeAreaView } from '../../components/safe-area-view';
import { Avatar, Box, Spacer, Text } from '../../ui/atoms';
import { Header } from '../../ui/organisms';
import { Alert, Pressable, ScrollView } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { LeftArrowWithTextButton } from '../../components/back-button';
import { TextLabelPresentation } from '../../ui/molecules/text-label-presentation';
import { useUserContext } from '../../context';
import { User } from '../../lib';
import { useImagePicker } from '../../lib/hooks/use-image-picker';
import { useUpdateProfile } from '../../lib/api/users/use-update-profile';
import { useImageUpload } from '../../lib/hooks/use-image-upload';
import { dateFormatter } from '../../lib/utils';

export const ProfileSettingsScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [user] = useUserContext();
  const { openImagePicker } = useImagePicker();

  const { handleImageUpload, percentage, isUploading } = useImageUpload();

  //TODO: fix phone number issue with firebase
  //TODO: fix role in firestore, users don't have a role, but we may not need it anymore

  const { fullname, username, email, phonenumber, birthdate, avatar } =
    user as User;

  const navigateToEditProfileModal = (value: string) => {
    //@ts-ignore
    navigation.navigate<any>('Settings/ProfileModal', {
      value,
    });
  };

  const handleProfileImage = async () => {
    try {
      const image = await openImagePicker();

      await handleImageUpload({
        path: image?.uri as string,
        size: image?.fileSize as number,
      });
    } catch (err: any) {
      //TODO: implement the error apiF
      Alert.alert('Image upload error', err);
    }
  };

  return (
    <CustomSafeAreaView>
      <Header
        renderLeftContent={() => (
          <LeftArrowWithTextButton
            onPress={() => navigation.goBack()}
            colour={theme.colours.greys.G300}
            text="Back"
          />
        )}
        renderRigthContent={() => (
          <Text size="body" weight="bold" colour={theme.colours.greys.G300}>
            Profile
          </Text>
        )}
      />
      <ScrollView>
        <Box>
          <Pressable onPress={handleProfileImage}>
            <Avatar
              style={{ alignSelf: 'center' }}
              size={124}
              radius={8}
              source={{ uri: avatar }}
            />
          </Pressable>
          <Spacer size="16" />
          <Pressable onPress={() => navigateToEditProfileModal('name')}>
            <TextLabelPresentation label="Full name" value={fullname} />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => navigateToEditProfileModal('username')}>
            <TextLabelPresentation label="Username" value={username} />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => navigateToEditProfileModal('dateOfBirth')}>
            <TextLabelPresentation
              label="Date of birth"
              value={dateFormatter(Number(birthdate), { dateStyle: 'short' })}
            />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => navigateToEditProfileModal('email')}>
            <TextLabelPresentation label="Email" value={email} />
          </Pressable>
          <Spacer size="8" />
          <Pressable onPress={() => navigateToEditProfileModal('phonenumber')}>
            <TextLabelPresentation
              label="Phone"
              value={`${phonenumber?.countryCode} ${phonenumber?.number}`}
            />
          </Pressable>
        </Box>
        <Spacer size="8" />
      </ScrollView>
    </CustomSafeAreaView>
  );
};
