import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import { ScrollView, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { CalendarModalView, CalendarRefProps } from "../calendar-modal-view";
import { TimelineCompactView } from "../timeline-view/compact-view";
import { PomodoroTimer } from "../pomodoro-timer";
import {
  UpdateStatusModalRefProps,
  UpdateStatusModalView,
} from "../update-status-modal-view";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { TodoProps, TodoStatus, TodoStatusTranslation, api } from "../../lib";
import { useLatest, useUpdateTodos } from "../../store";
import { dateFormatter } from "../../lib/utils";
import { TimeStatus } from "@/components/time-status";
import { useTranslation } from "react-i18next";

const BadgeBGColor: Record<string, string> = {
  ON_GOING: '#F2F1FC',
  COMPLETED: '#E6FAE6',
  ON_HOLD: '#F4F2D9',
  TODO: '#FBF8ED',
};

const BadgeTextColor: Record<string, string> = {
  ON_GOING: '#645CAA',
  COMPLETED: '#5EAB5C',
  ON_HOLD: '#AAA25C',
  TODO: '#645CAA',
};

const DateChip = ({ colour, label, isActive }: { colour: string; label: string; isActive: boolean }) => (
  <Pressable className={cn("p-2.5 items-center justify-center rounded-lg")} style={{ backgroundColor: colour }}>
    <Text className="text-sm font-medium text-gray-500">{label}</Text>
  </Pressable>
);

export const TodoView = ({ todo }: { todo: TodoProps }) => {
  const clearTimeoutRef = useRef<any>(null);

  const { t } = useTranslation();
  const router = useRouter();
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
        <View className="h-4" />
        <View
          className={cn("px-4 pl-14")}
        >
          {showDate && (
            <TimeStatus endDate={state.endDate} status={state.status} />
          )}
          <TextInput
            className={cn("py-3 border border-transparent text-2xl")}
            style={{ fontWeight: '500' }}
            multiline
            value={state?.todo}
            onChangeText={(value) => onFormChange(value, "todo")}
            scrollEnabled={false}
          />
        </View>
        <View className="h-2" />
        <View
          className={cn("px-4 flex-row items-center")}
        >
          <MaterialIcons name="description" size={24} />
          <View className={cn("px-4")}>
            <TextInput
              className={cn("py-3 border border-transparent text-sm")}
              style={{ fontWeight: '500' }}
              multiline
              textAlignVertical="top"
              placeholder={t("todo.text_input.placeholder") ?? undefined}
              value={state?.description}
              scrollEnabled={false}
              onChangeText={(value) => onFormChange(value, "description")}
            />
          </View>
        </View>
        <View className="h-8" />
        <View
          className={cn("px-4 p-0 flex-row items-center")}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <View className="w-4" />
          <Pressable onPress={() => onPressToggleModalVisibility("startDate")}>
            <DateChip
              label={dateStartLabel}
              isActive
              colour={
                !state?.startDate ? '#F0EFF7' : '#eff7ee'
              }
            />
          </Pressable>
        </View>
        <View className="h-8" />
        <View
          className={cn("px-4 p-0 flex-row items-center")}
        >
          <MaterialIcons name="timeline" size={24} />
          <View className="w-4" />
          <View style={{ flex: 1 }}>
            <TimelineCompactView id={state?.id ?? ""} />
          </View>
        </View>
        <View className="h-8" />
        <View className={cn("px-4 p-0")}>
          <PomodoroTimer todoId={state?.id ?? ""} todoName={state?.todo ?? ""} />
        </View>
        <View className="h-8" />
        <View
          className={cn("px-4 p-0 flex-row items-center")}
        >
          <MaterialIcons name="calendar-today" size={24} />
          <View className="w-4" />
          <Pressable onPress={() => onPressToggleModalVisibility("endDate")}>
            <DateChip
              label={dateEndLabel}
              isActive
              colour={
                !state?.endDate ? '#F0EFF7' : '#fbf8ed'
              }
            />
          </Pressable>
        </View>
        <View className="h-4" />
        <View
          className={cn("px-4 flex-row pl-14")}
        >
          <Badge
            variant="default"
            className="rounded rounded-br-none border-transparent p-2"
            style={{ backgroundColor: BadgeBGColor[state?.status ?? TodoStatus.ON_HOLD] }}
          >
            <Text style={{ color: BadgeTextColor[state?.status ?? TodoStatus.ON_HOLD] }} className="text-xs font-medium">
              {t(
                TodoStatusTranslation[
                  state?.status as keyof typeof TodoStatusTranslation
                ]
              )}
            </Text>
          </Badge>
        </View>
      </ScrollView>
      <View
        className={cn("px-4 flex-row justify-between")}
      >
        <Button
          onPress={() => {
            router.push(`/retro/${state?.id}?name=${encodeURIComponent(state?.todo || '')}`);
          }}
          variant="ghost"
          size="default"
        >
          <Text>Retrospective</Text>
        </Button>
        <Button
          onPress={() => {
            todoStatusRef.current?.toggleModalVisibility();
          }}
          variant="ghost"
          size="default"
        >
          <Text>{t("general.update_progress")}</Text>
        </Button>
      </View>
    </>
  );
};
