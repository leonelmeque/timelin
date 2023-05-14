import { useNavigation } from '@react-navigation/native';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { SignInFormView } from '../../components/signin-form-view';
import { useUserContext } from '../../context';
import { useState } from 'react';
import { User, api } from '../../lib';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  padding-bottom: ${HEIGHT / 4}px;
  position: absolute;
  top: ${HEIGHT / 3}px;
  width: ${WIDTH}px;
  border-top-right-radius: ${(props) => props.theme.spacing.size32}px;
  border-top-left-radius: ${(props) => props.theme.spacing.size32}px;
  background-color: ${(props) => props.theme.colours.neutrals.white};
`;

const bg = require('../../../assets/bg-login.jpg');

export const SignInScreen = () => {
  const navigation = useNavigation();
  const [_, dispatch] = useUserContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignIn = async ({
    username,
    password,
  }: {
    username?: string;
    password?: string;
  }) => {
    try {
      setIsLoggingIn(true);
      const { userData } = await api.users.userSignIn({
        username,
        password,
      });

      const { displayName, photoURL } = api.users.getUserProfile();

      if (userData) {
        dispatch({
          ...userData,
          avatar: photoURL,
          fullname: displayName,
        } as User);
      } else {
        alert('Unable to login. Please try again.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <CustomSafeAreaView>
      <Image
        source={bg}
        style={{ width: WIDTH, height: HEIGHT, position: 'absolute' }}
      />
      <Container>
        <SignInFormView
          isLoggingIn={isLoggingIn}
          onSignin={(data) => handleSignIn(data)}
          //@ts-ignore
          goToSignup={() => navigation.navigate('Todo/Signup')}
        />
      </Container>
    </CustomSafeAreaView>
  );
};
