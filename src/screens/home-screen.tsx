import { Suspense } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, Pressable, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { AddTodoModalView } from "../components/add-todo-modal-view";
import { useCustomModal, useUserContext } from "../context";
import { CustomSafeAreaView } from "../components/safe-area-view";
import { ProjectList } from "../components/project-list";
import { PinnedTodo } from "../components/pinned-todo";
import { tokens } from "../lib";
import { Avatar, Spacer } from "../ui/atoms";
import { Header } from "../ui/organisms";
import { LatestList } from "../components/latest-list";
import { HomeScreenTemplate } from "../ui/templates/home-screen-template";

const SafeArea = styled(CustomSafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisibility, setModalVisibility] = useCustomModal();
  const [user] = useUserContext();

  const onModalDismiss = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  };

  const renderRigthContent = () => (
    <Pressable
      onPress={() => {
        // @ts-ignore
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
        <AddTodoModalView
          visibility={modalVisibility}
          onModalDismiss={onModalDismiss}
        />
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
