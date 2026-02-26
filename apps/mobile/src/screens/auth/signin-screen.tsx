import { useRouter } from "expo-router";
import { View, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { User, api } from "../../lib";
import { useUserContext } from "../../context";

export const SignInScreen = () => {
  const router = useRouter();
  const [, dispatch] = useUserContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      const { userData } = await api.users.userSignIn({ username, password });
      const { displayName, photoURL } = api.users.getUserProfile();

      if (userData) {
        dispatch({
          ...userData,
          avatar: photoURL,
          fullname: displayName,
        } as User);
      } else {
        alert("Unable to login. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-bg"
    >
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm">
          {/* Logo / Brand */}
          <View className="items-center mb-10">
            <Text className="text-3xl font-bold text-fg">Timelin</Text>
            <Text className="text-sm text-fg-secondary mt-1">
              Focus on what matters
            </Text>
          </View>

          {/* Form */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-fg mb-1.5">Email</Text>
            <Input
              placeholder="you@example.com"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              keyboardType="email-address"
              className="border-border bg-bg"
            />
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-fg mb-1.5">Password</Text>
            <Input
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              className="border-border bg-bg"
            />
          </View>

          <Button
            onPress={handleSignIn}
            disabled={isLoggingIn || !username || !password}
            className="mb-4"
          >
            <Text>{isLoggingIn ? 'Signing in...' : 'Sign in'}</Text>
          </Button>

          <Pressable onPress={() => router.push("/(auth)/sign-up")}>
            <Text className="text-sm text-fg-secondary text-center">
              {"Don't have an account? "}
              <Text className="text-sm text-accent font-medium">Create one</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
