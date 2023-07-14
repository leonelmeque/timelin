import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { ScrollView, View, Pressable } from "react-native";
import styled from "styled-components/native";
import { CalendarModalView, CalendarRefProps } from "../calendar-modal-view";
import { TimelineCompactView } from "../timeline-view/compact-view";
import {
  UpdateStatusModalRefProps,
  UpdateStatusModalView,
} from "../update-status-modal-view";
import {
  Badge,
  Box,
  Chip,
  Palette,
  PlainTextInput,
  Spacer,
  Button,
} from "../../ui/atoms";
import { TodoProps, TodoStatus, TodoStatusTranslation, api } from "../../lib";
import { useLatest, useUpdateTodos } from "../../store";
import { dateFormatter } from "../../lib/utils";
import { TimeStatus } from "../../ui/molecules";
import { useTranslation } from "react-i18next";

const DateChip = styled(Chip) <{ colour: string }>`
  background-color: ${(props) => props.colour};
`;

export const TodoView = ({ todo }: { todo: TodoProps }) => {
  const clearTimeoutRef = useRef<any>(null);

  const { t } = useTranslation();
  const [state, setState] = useState<TodoProps | null>(todo);
  const { handleSyncTodoAtom } = useUpdateTodos();
  const { updateLatestChanged } = useLatest();

  const calendarRef = useRef<CalendarRefProps>(null);
  const todoStatusRef = useRef<UpdateStatusModalRefProps>(null);

  const dateStartLabel = !state?.startDate
    ? t("todo.start_date_label.empty_state")
    : dateFormatter(state.startDate);

  const dateEndLabel = !state?.endDate
    ? t("todo.end_date_label.empty_state")
    : dateFormatter(state.endDate);

  const showDate = state?.startDate && state?.endDate;

  const onFormChange = (value: string, inputName: string) => {
    if (!state) return;

    const newTodo = { ...state, [inputName]: value };
    setState(newTodo);

    if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);

    clearTimeoutRef.current = setTimeout(async () => {
      try {
        await api.todo.updateTodo(state.id, newTodo);
        await api.todo.addLatestChanged(state.id);
        handleSyncTodoAtom(newTodo.id, newTodo);
        updateLatestChanged(state.id);
      } catch (err) {
        console.error(err);
      }
    }, 350);
  };

  const onPressToggleModalVisibility = (name: string) => {
    calendarRef.current?.toggleModal();
    calendarRef.current?.setFormName(name);
  };

  const onPressSaveDate = () => {
    const { date, name, toggleModal } = calendarRef.current || {};
    onFormChange(String(date), name || "");
    if (toggleModal) toggleModal();
  };

  return (
    <>
      <CalendarModalView
        ref={calendarRef}
        onPressCancel={() => calendarRef.current?.toggleModal()}
        onPressSave={onPressSaveDate}
      />
      <UpdateStatusModalView
        onSelect={(value) => onFormChange(value, "status")}
        ref={todoStatusRef}
        initialSelection={state?.status ?? ""}
      />
      <ScrollView>
        <Spacer size="8" />
        <Box
          style={{
            paddingLeft: 56,
          }}
        >
          {showDate && (
            <TimeStatus endDate={state.endDate} status={state.status} />
          )}
          <PlainTextInput
            size="large"
            weight="500"
            multiline
            value={state?.todo}
            onChangeText={(value) => onFormChange(value, "todo")}
            scrollEnabled={false}
          />
        </Box>
        <Spacer size="4" />
        <Box
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="description" size={24} />
          <Box>
            <PlainTextInput
              size="body"
              weight="500"
              multiline
              textAlignVertical="top"
              placeholder={t("todo.text_input.placeholder") ?? undefined}
              value={state?.description}
              scrollEnabled={false}
              onChangeText={(value) => onFormChange(value, "description")}
            />
          </Box>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <Spacer size="8" />
          <Pressable onPress={() => onPressToggleModalVisibility("startDate")}>
            <DateChip
              label={dateStartLabel}
              isActive
              colour={
                !state?.startDate ? Palette.primary.P50 : Palette.success.S50
              }
            />
          </Pressable>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="timeline" size={24} />
          <Spacer size="8" />
          <View style={{ flex: 1 }}>
            <TimelineCompactView id={state?.id ?? ""} />
          </View>
        </Box>
        <Spacer size="16" />
        <Box
          style={{
            padding: 0,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <Spacer size="8" />
          <Pressable onPress={() => onPressToggleModalVisibility("endDate")}>
            <DateChip
              label={dateEndLabel}
              isActive
              colour={
                !state?.endDate ? Palette.primary.P50 : Palette.warning.W50
              }
            />
          </Pressable>
        </Box>
        <Spacer size="8" />
        <Box
          style={{
            flexDirection: "row",
            paddingLeft: 56,
          }}
        >
          <Badge
            type="colored"
            status={state?.status ?? TodoStatus.ON_HOLD}
            label={t(
              TodoStatusTranslation[
                state?.status as keyof typeof TodoStatusTranslation
              ]
            )}
          />
        </Box>
      </ScrollView>
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onPress={() => {
            todoStatusRef.current?.toggleModalVisibility();
          }}
          label={t("general.update_progress") ?? undefined}
          variant="tertiary"
          size="md"
        />
      </Box>
    </>
  );
};
