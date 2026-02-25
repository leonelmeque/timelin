import { useRouter } from "expo-router";
import { View, Pressable, ScrollView, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AddTodoModalView } from "../components/add-todo-modal-view";
import { useCustomModal, useUserContext } from "../context";
import { useFetchTodos } from "../store";
import { Text } from "~/components/ui/text";
import { useResponsive } from "../hooks/use-responsive";
import { TodoProps } from "../lib";
import { dateFormatter } from "../lib/utils";

function TaskRow({ todo, onPress }: { todo: TodoProps; onPress: () => void }) {
  const statusColors: Record<string, string> = {
    TODO: 'bg-tag-gray',
    ON_GOING: 'bg-tag-blue',
    ON_HOLD: 'bg-tag-orange',
    COMPLETED: 'bg-tag-green',
  };

  const statusLabels: Record<string, string> = {
    TODO: 'Todo',
    ON_GOING: 'In Progress',
    ON_HOLD: 'On Hold',
    COMPLETED: 'Done',
  };

  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center py-2.5 px-3 border-b border-border active:bg-bg-secondary"
    >
      <View className="flex-1 mr-3">
        <Text className="text-sm font-medium text-fg" numberOfLines={1}>
          {todo.todo}
        </Text>
        {todo.description ? (
          <Text className="text-xs text-fg-tertiary mt-0.5" numberOfLines={1}>
            {todo.description}
          </Text>
        ) : null}
      </View>
      <View className={`px-2 py-0.5 rounded ${statusColors[todo.status] || 'bg-tag-gray'}`}>
        <Text className="text-2xs text-fg-secondary font-medium">
          {statusLabels[todo.status] || todo.status}
        </Text>
      </View>
      <Text className="text-xs text-fg-tertiary ml-3 hidden sm:flex">
        {dateFormatter(todo.timestamp)}
      </Text>
    </Pressable>
  );
}

function SectionTitle({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View className="flex-row items-center justify-between mb-1.5">
      <Text className="text-xs font-semibold text-fg-tertiary uppercase tracking-wider">
        {title}
      </Text>
      {action && (
        <Pressable onPress={onAction}>
          <Text className="text-xs text-accent font-medium">{action}</Text>
        </Pressable>
      )}
    </View>
  );
}

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

  const navigateToTodo = (id: string) => {
    router.push(`/todo/${id}`);
  };

  return (
    <View className="flex-1 bg-bg">
      <AddTodoModalView
        visibility={modalVisibility}
        onModalDismiss={onModalDismiss}
      />

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-12 pb-3 sm:pt-4">
        <Text className="text-xl font-bold text-fg">
          {user?.fullname ? `Hi, ${user.fullname}` : 'Home'}
        </Text>
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.push("/search")}
            className="w-8 h-8 items-center justify-center rounded active:bg-bg-secondary"
          >
            <MaterialIcons name="search" size={20} color="#787774" />
          </Pressable>
          {showSidebar && (
            <Pressable
              onPress={() => setModalVisibility(true)}
              className="ml-2 flex-row items-center px-3 py-1.5 bg-accent rounded active:opacity-90"
            >
              <MaterialIcons name="add" size={16} color="white" />
              <Text className="text-sm text-fg-inverse font-medium ml-1">New</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: isMobile ? 100 : 32 }}
        className="flex-1 px-6"
      >
        {/* Tasks */}
        <SectionTitle
          title="Tasks"
          action="View all"
          onAction={() => router.push("/list-todos")}
        />
        <View className="rounded-lg border border-border overflow-hidden mb-6">
          {!todos?.length ? (
            <View className="py-10 items-center">
              <MaterialIcons name="check-circle-outline" size={32} color="#B4B4B0" />
              <Text className="text-sm text-fg-tertiary mt-2">No tasks yet</Text>
              <Pressable onPress={() => setModalVisibility(true)} className="mt-2">
                <Text className="text-sm text-accent font-medium">Create your first task</Text>
              </Pressable>
            </View>
          ) : (
            todos.map((todo: TodoProps) => (
              <TaskRow
                key={todo.id}
                todo={todo}
                onPress={() => navigateToTodo(todo.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.displayName = "HomeScreen";
