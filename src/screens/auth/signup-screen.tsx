import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, Platform, Pressable, ScrollView } from "react-native";
import styled from "styled-components/native";
import { CustomSafeAreaView } from "../../components/safe-area-view";
import { SignupFormView } from "../../components/signup-form-view";
import { useState } from "react";
import { SignupSuccessView } from "../../components/signup-success-view";
import { useUserContext } from "../../context";
import { User, api } from "../../lib";
import { Spacer, Text } from "../../ui/atoms";
import { Header } from "../../ui/organisms";
import { useTheme } from "styled-components";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  padding-top: ${props => props.theme.spacing.size32}px;
  width: ${WIDTH}px;
  border-top-right-radius: ${(props) => props.theme.spacing.size32}px;
  border-top-left-radius: ${(props) => props.theme.spacing.size32}px;
  background-color: ${(props) => props.theme.colours.neutrals.white};
`;

const bg = require("../../../assets/bg-login.jpg");

const BackButton = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const SignupScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
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
    <CustomSafeAreaView
      style={{
        backgroundColor: theme.colours.neutrals.white,
      }}
    >
      {signInSuccess ? (
        <SignupSuccessView onContinue={handleOnContinue} />
      ) : (
        <>
          <Image
            source={bg}
              style={{ width: WIDTH, height: HEIGHT / 2, position: "absolute" }}
          />
          <Header
            renderRigthContent={() => (
              <Text
                size="body"
                weight="bold"
                  colour={theme.colours.neutrals.white}
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
                      color={theme.colours.neutrals.white}
                    />
                    <Spacer size="4" />
                    <Text size="body" colour={theme.colours.neutrals.white}>
                      Back
                    </Text>
                  </BackButton>
                </Pressable>
              </>
            )}
          />
            <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <SignupFormView
                  onSubmit={handleSignup}
                  goToLogin={() => navigation.goBack()}
                />
              </ScrollView>
          </Container>
        </>
      )}
    </CustomSafeAreaView>
  );
};
