import { useNavigation, useRoute } from '@react-navigation/native';
import { Box, Spacer, Text } from '../../ui/atoms';
import { CustomSafeAreaView } from '../safe-area-view';
import { MaterialIcons } from '@expo/vector-icons';
import { ChangePasswordForm } from './change-password-form';
import { KeyboardAvoidingView } from 'react-native';

export const AccountSettingsModalView = () => {
  const {
    params: { value },
  } = useRoute() as any;

  const navigation = useNavigation();

  const RenderFrom = () => {
    if (value === 'change-password') {
      return <ChangePasswordForm />;
    } else if (value === 'delete-account') {
      return <></>;
    }
    return <></>;
  };

  return (
    <CustomSafeAreaView>
      <KeyboardAvoidingView>
        <Box>
          <Spacer size="8" />
          <MaterialIcons
            name="close"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <Spacer size="8" />
          <Text size="heading" weight="bold">
            Change password
          </Text>
          <RenderFrom />
        </Box>
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};
