import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { SignupFormView } from '../../components/signup-form-view';
import { useState } from 'react';
import { SignupSuccessView } from '../../components/signup-success-view';
import { useUserContext } from '../../context';
import { hooks, User, api, tokens } from '../../lib';
import { Spacer, Text } from '../../ui/atoms';
import { Header } from '../../ui/organisms';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  padding-bottom: ${HEIGHT / 6}px;
  position: absolute;
  top: ${HEIGHT / 6}px;
  width: ${WIDTH}px;
  border-top-right-radius: ${(props) => props.theme.spacing.size32}px;
  border-top-left-radius: ${(props) => props.theme.spacing.size32}px;
  background-color: ${(props) => props.theme.colours.neutrals.white};
`;

const bg = require('../../../assets/bg-login.jpg');

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const SignupScreen = () => {
  const navigation = useNavigation();
  const [theme] = hooks.useThemeSwitcher();
  const [signInSuccess, setSignInSuccess] = useState(false);

  const [newUser, setNewUser] = useState<User<{}> | null>(null);
  const [, dispatch] = useUserContext();

  async function handleSignup<T>(data: Partial<User & { [key: string]: any }>) {
    try {
      const res = await api.users.userSignUp(data);
      setSignInSuccess(true);
      setNewUser(res);
    } catch (err) {
      alert(err);
    }
  }

  function handleOnContinue() {
    dispatch(newUser);
  }

  return (
    <CustomSafeAreaView>
      {signInSuccess ? (
        <SignupSuccessView onContinue={handleOnContinue} />
      ) : (
        <>
          <Image
            source={bg}
            style={{ width: WIDTH, height: HEIGHT, position: 'absolute' }}
          />
          <Header
            renderRigthContent={() => (
              <Text
                size="body"
                weight="bold"
                colour={tokens.colours[theme].neutrals.white}
              >
                Timeline
              </Text>
            )}
            renderLeftContent={() => (
              <>
                <Pressable onPress={() => navigation.goBack()}>
                  <BackButton>
                    <MaterialIcons
                      name="arrow-back"
                      size={24}
                      color={tokens.colours[theme].neutrals.white}
                    />
                    <Spacer size="4" />
                    <Text
                      size="body"
                      colour={tokens.colours[theme].neutrals.white}
                    >
                      Back
                    </Text>
                  </BackButton>
                </Pressable>
              </>
            )}
          />
          <Container>
            <SignupFormView
              onSubmit={handleSignup}
              goToLogin={() => navigation.goBack()}
            />
          </Container>
        </>
      )}
    </CustomSafeAreaView>
  );
};
