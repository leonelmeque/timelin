import React, { Suspense } from "react";
import { CustomSafeAreaView } from "../components/safe-area-view";
import { useNavigation } from "@react-navigation/native";
import { Pressable, ScrollView } from "react-native";
import { useUserContext } from "../context";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { ProjectList } from "../components/project-list";
import { PinnedTodo } from "../components/pinned-todo";
import { tokens } from "../lib";
import { Box, Avatar, Spacer, Text } from "../ui/atoms";
import { Header } from "../ui/organisms";
import { LatestList } from "../components/latest-list";
import { HomeScreenTemplate } from "../ui/templates/home-screen-template";

const SafeArea = styled(CustomSafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [user] = useUserContext();

  const renderRigthContent = () => (
    <Pressable
      onPress={() => {
        //@ts-ignore
        navigation.navigate<string>("Todo/Search");
      }}
    >
      <MaterialIcons name="search" size={24} />
    </Pressable>
  );

  const renderLeftContent = () => (
    <Avatar
      size={tokens.spacing.size48}
      radius={tokens.spacing.size8}
      source={{
        uri: user?.avatar,
        cache: "force-cache",
      }}
    />
  );

  const suspenseFallback = () => <HomeScreenTemplate />;

  return (
    <SafeArea>
      <Suspense fallback={suspenseFallback()}>
        <Header
          renderLeftContent={renderLeftContent}
          renderRigthContent={renderRigthContent}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: 74,
          }}
        >
          <Spacer size="8" />
          <ProjectList />
          <Spacer size="4" />
          <PinnedTodo />
          <Spacer size="8" />
          <LatestList />
          <Spacer size="8" />
        </ScrollView>
      </Suspense>
    </SafeArea>
  );
}

HomeScreen.displayName = "HomeScreen";
