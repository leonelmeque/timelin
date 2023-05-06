import React, { Suspense } from 'react';
import { CustomSafeAreaView } from '../components/safe-area-view';
import { useNavigation } from '@react-navigation/native';
import { Keyboard, Pressable, ScrollView } from 'react-native';
import { AddTodoModalView } from '../components/add-todo-modal-view';
import { useCustomModal } from '../context';
import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { ProjectList } from '../components/project-list';
import { PinnedTodo } from '../components/pinned-todo';
import { tokens } from '../lib';
import { Box, Avatar, Spacer, Text } from '../ui/atoms';
import { Header } from '../ui/organisms';
import { LatestList } from '../components/latest-list';

const SafeArea = styled(CustomSafeAreaView)`
  flex: 1;
  background-color: #fff;
`;

const SectionHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
`;

const SectionContent = styled.View`
  flex: 1;
`;

const Section = styled(Box)`
  flex: 1;
  padding: 0px;
`;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisibility, setModalVisibility] = useCustomModal();

  const onModalDismiss = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  };

  const renderRigthContent = () => (
    <Pressable
      onPress={() => {
        //@ts-ignore
        navigation.navigate<string>('Todo/Search');
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
        uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80',
      }}
    />
  );

  const suspenseFallback = () => (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text size="heading">Loading data</Text>
    </Box>
  );

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

HomeScreen.displayName = 'HomeScreen';
