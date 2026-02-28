import { useRouter, useLocalSearchParams } from "expo-router";
import { GestureResponderEvent, Pressable, View } from "react-native";
import { CustomSafeAreaView } from "../components/safe-area-view";
import { MaterialIcons } from "@expo/vector-icons";
import { TodoView } from "../components/todo-view";
import { HeaderActions } from "../components/header-actions";
import { useConfirmation } from "../hooks/use-confirmation";
import { onShare } from "../utils/utils";
import { api } from "../lib";
import { useUpdateTodos, useFetchTodo } from "../store";
import { Text } from '@/components/ui/text';
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

const TodoScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { handleDeleteTodoAtom } = useUpdateTodos();

  const todoId = id ?? "";

  async function onConfirm() {
    try {
      await api.todo.deleteTodo(todoId);
      handleDeleteTodoAtom(todoId);
      router.back();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  const { ConfirmationDialog, handleConfirm } = useConfirmation({
    title: t("todo.modal.delete_project.title"),
    message: t("todo.modal.message"),
    confirmText: t("todo.modal.confirm_button.label"),
    cancelText: t("todo.modal.cancel_button.label"),
    onConfirm,
    onCancel: () => {},
  });

  const {
    value: [state],
    resetCacheData,
  } = useFetchTodo(todoId);

  const onPressDeleteTodo =
    (_id: string) => async (_e: GestureResponderEvent) => {
      handleConfirm();
    };

  return (
    <>
      <CustomSafeAreaView>
        <Header
          renderLeftContent={() => (
            <Pressable
              onPress={() => {
                resetCacheData();
                router.back();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons name="arrow-back" size={24} />
                <View className="w-2" />
                <Text className="font-medium">
                  Back
                </Text>
              </View>
            </Pressable>
          )}
          renderRightContent={() => (
            <HeaderActions
              onPressDelete={onPressDeleteTodo(todoId)}
              onPressShare={async () =>
                await onShare(
                  (state as typeof state & { data: any })?.data?.todo as string
                )
              }
            />
          )}
        />

        {state.state === "loading" ? (
          <View className="px-4 gap-4">
            <Skeleton style={{ height: 20, width: 200 }} />
            <Skeleton style={{ height: 30, width: "90%" }} />
            <Skeleton style={{ height: 15, width: "80%" }} />
            <Skeleton style={{ height: 15, width: "90%" }} />
            <Skeleton style={{ height: 15, width: "60%" }} />
            <Skeleton style={{ height: 30, width: 200 }} />
            <Skeleton style={{ height: 15, width: "80%" }} />
            <Skeleton style={{ height: 15, width: "90%" }} />
            <Skeleton style={{ height: 15, width: "60%" }} />
          </View>
        ) : (
          <TodoView todo={(state as typeof state & { data: any })?.data} />
        )}
      </CustomSafeAreaView>
      <ConfirmationDialog />
    </>
  );
};

export default TodoScreen;
