import { useRouter } from "expo-router";
import { View, Pressable, ScrollView, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AddTodoModalView } from "../components/add-todo-modal-view";
import { useCustomModal, useUserContext } from "../context";
import { useFetchTodos } from "../store";
import { Text } from "~/components/ui/text";
import { useResponsive } from "../hooks/use-responsive";
import { StackedTasks } from "../components/stacked-tasks";

export default function HomeScreen() {
  const router = useRouter();
  const [modalVisibility, setModalVisibility] = useCustomModal();
  const [user] = useUserContext();
  const { isMobile, showSidebar } = useResponsive();
  const todos = useFetchTodos();

  const onModalDismiss = () => {
    Keyboard.dismiss();
    setModalVisibility(!modalVisibility);
  };

  return (
    <View className="flex-1 bg-[#191919]">
      <AddTodoModalView
        visibility={modalVisibility}
        onModalDismiss={onModalDismiss}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-4 sm:pt-5">
        <View>
          <Text className="text-2xl font-bold text-white">
            Tasks
          </Text>
          <Text className="text-sm text-gray-400 mt-0.5">
            {todos?.length || 0} tasks · tap to expand
          </Text>
        </View>
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.push("/search")}
            className="w-9 h-9 items-center justify-center rounded-full active:bg-white/10"
          >
            <MaterialIcons name="search" size={20} color="#9CA3AF" />
          </Pressable>
          <Pressable
            onPress={() => setModalVisibility(true)}
            className="ml-2 flex-row items-center border border-gray-600 px-3.5 py-1.5 rounded-full active:bg-white/10"
          >
            <MaterialIcons name="add" size={16} color="#E5E7EB" />
            <Text className="text-sm text-gray-200 font-medium ml-1">Add</Text>
          </Pressable>
        </View>
      </View>

      {/* Task stack */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: isMobile ? 110 : 40 }}
        className="flex-1 px-4"
      >
        <StackedTasks tasks={todos || []} />

        {!todos?.length && (
          <View className="items-center py-16">
            <MaterialIcons name="check-circle-outline" size={48} color="#4B5563" />
            <Text className="text-base text-gray-500 mt-3">No tasks yet</Text>
            <Pressable
              onPress={() => setModalVisibility(true)}
              className="mt-3 px-4 py-2 bg-white/10 rounded-full active:bg-white/20"
            >
              <Text className="text-sm text-gray-300 font-medium">Create your first task</Text>
            </Pressable>
          </View>
        )}

        {/* Quick links */}
        {(todos?.length || 0) > 0 && (
          <Pressable
            onPress={() => router.push("/list-todos")}
            className="flex-row items-center justify-center py-4 mt-4"
          >
            <Text className="text-sm text-gray-500 font-medium">View all tasks</Text>
            <MaterialIcons name="chevron-right" size={16} color="#6B7280" />
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

HomeScreen.displayName = "HomeScreen";
