import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { api } from '@todo/commons';
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import { CustomSafeAreaView } from '../../components/safe-area-view';
import { SignInFormView } from '../../components/signin-form-view';
import { useUserContext } from '../../context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase';

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

export const SigninScreen = () => {
  const navigation = useNavigation();
  const [_, dispatch] = useUserContext();

  const handleSignIn = async ({
    username,
    password,
  }: {
    username?: string;
    password?: string;
  }) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        username as string,
        password as string
      );

      const userData = await api.users.getUserInformation(result.user.uid);
      console.log(userData)
      const token = await api.users.createCustomToken(result.user.uid);



      if (userData.result && token.result.customToken) {
        await AsyncStorage.setItem('sessionToken', token.result.customToken);
        dispatch(userData.result);
      } else {
        alert('Unable to login. Please try again.');
      }
    } catch (error) {
      console.error(error);
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
          onSignin={(data) => handleSignIn(data)}
          //@ts-ignore
          goToSignup={() => navigation.navigate('Todo/Signup')}
        />
      </Container>
    </CustomSafeAreaView>
  );
};
