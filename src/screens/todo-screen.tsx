import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { GestureResponderEvent, Pressable, View } from "react-native";
import { CustomSafeAreaView } from "../components/safe-area-view";
import { MaterialIcons } from "@expo/vector-icons";
import { TodoView } from "../components/todo-view";
import { HeaderActions } from "../components/header-actions";
import { useConfirmation } from "../hooks/use-confirmation";
import { onShare } from "../utils/utils";
import { TodoProps, api } from "../lib";
import { useUpdateTodos, useFetchTodo } from "../store";
import { Spacer, Text } from "../ui/atoms";
import { Header } from "../ui/organisms";
import { TodoScreenTemplate } from "../ui/templates/todo-screen.template";
import { useTranslation } from "react-i18next";

type AddTodoScreenProps = {
  Params: {
    todo: TodoProps;
  };
};

const TodoScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { handleDeleteTodoAtom } = useUpdateTodos();
  const { params } = useRoute<RouteProp<AddTodoScreenProps>>();

  async function onConfirm() {
    try {
      await api.todo.deleteTodo(params.todo.id);
      handleDeleteTodoAtom(params.todo.id);
      navigation.goBack();
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
  } = useFetchTodo(params.todo.id);

  const onPressDeleteTodo =
    (id: string) => async (e: GestureResponderEvent) => {
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
                navigation.goBack();
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
              onPressDelete={onPressDeleteTodo(params.todo.id)}
              onPressShare={async () =>
                await onShare(
                  (state as typeof state & { data: any })?.data.todo as string
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
