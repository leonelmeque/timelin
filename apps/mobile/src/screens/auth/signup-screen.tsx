import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from "react-native";
import { CustomSafeAreaView } from "../../components/safe-area-view";
import { SignupFormView } from "../../components/signup-form-view";
import { useState } from "react";
import { SignupSuccessView } from "../../components/signup-success-view";
import { useUserContext } from "../../context";
import { User, api } from "../../lib";
import { Text } from '@/components/ui/text';
import { Header } from "@/components/header";
import { cn } from '@/lib/cn';

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const bg = require("../../../assets/bg-login.jpg");

export const SignupScreen = () => {
  const router = useRouter();
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
      className={cn("bg-neutrals-white")}
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
            renderRightContent={() => (
              <Text
                className="font-bold text-neutrals-white"
              >
                Timeline
              </Text>
            )}
            renderLeftContent={() => (
              <>
                <Pressable onPress={() => router.back()}>
                  <View className="items-center flex-row">
                    <MaterialIcons
                      name="arrow-back"
                      size={24}
                      color="#FFFFFF"
                    />
                    <View className="w-2" />
                    <Text className="text-neutrals-white">
                      Back
                    </Text>
                  </View>
                </Pressable>
              </>
            )}
          />
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              className="flex-1 bg-neutrals-white"
              style={{
                paddingTop: 32,
                width: WIDTH,
                borderTopRightRadius: 32,
                borderTopLeftRadius: 32,
              }}
            >
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <SignupFormView
                  onSubmit={handleSignup}
                  goToLogin={() => router.back()}
                />
              </ScrollView>
          </KeyboardAvoidingView>
        </>
      )}
    </CustomSafeAreaView>
  );
};
