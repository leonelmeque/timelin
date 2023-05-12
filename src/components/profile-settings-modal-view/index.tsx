import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Spacer } from '../../ui/atoms';
import { MaterialIcons } from '@expo/vector-icons';
import { ProfileEditTitle } from './profile-edit-title';
import { ProfileEditFormFields } from './profile-edit-form-fields';

export const ProfileSettingsModalView = () => {
  const {
    params: { value },
  } = useRoute() as any;

  const navigation = useNavigation();

  return (
    <Box>
      <Spacer size="8" />
      <MaterialIcons
        name="close"
        size={24}
        color="black"
        onPress={() => navigation.goBack()}
      />
      <Spacer size="8" />
      <ProfileEditTitle field={value} />
      <Spacer size="8" />
      <ProfileEditFormFields field={value} />
    </Box>
  );
};
