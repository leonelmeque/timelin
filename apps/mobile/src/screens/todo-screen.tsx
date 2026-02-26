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
import { Spacer, Text } from "../ui/atoms";
import { Header } from "../ui/organisms";
import { TodoScreenTemplate } from "../ui/templates/todo-screen.template";
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
                <Spacer size="4" />
                <Text size="body" weight="medium">
                  Back
                </Text>
              </View>
            </Pressable>
          )}
          renderRigthContent={() => (
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
          <TodoScreenTemplate />
        ) : (
          <TodoView todo={(state as typeof state & { data: any })?.data} />
        )}
      </CustomSafeAreaView>
      <ConfirmationDialog />
    </>
  );
};

export default TodoScreen;
