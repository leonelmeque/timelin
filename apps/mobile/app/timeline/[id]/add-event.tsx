import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Pressable, Platform, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "../../../src/context";
import { useTimeline } from "../../../src/store";
import { TimelineEventProps, api } from "../../../src/lib";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function AddEvent() {
  const router = useRouter();
  const { id: todoId } = useLocalSearchParams<{ id: string }>();
  const [user] = useUserContext();
  const { handleAddTimeline } = useTimeline();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSave = async () => {
    if (!title.trim()) return;
    const event: TimelineEventProps = {
      title: title.trim(),
      description: description.trim(),
      timestamp: new Date().toISOString(),
      creator: user?.id || '',
    };
    try {
      const data = await api.timeline.addTimelineEvent(todoId || '', event);
      handleAddTimeline(data);
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-bg"
    >
      {/* Header */}
      <View className="flex-row items-center px-6 pt-12 pb-3 sm:pt-4 border-b border-border">
        <Pressable onPress={() => router.back()} className="flex-row items-center mr-4">
          <MaterialIcons name="close" size={20} color="#37352F" />
        </Pressable>
        <Text className="text-lg font-bold text-fg flex-1">Add Timeline Event</Text>
      </View>

      {/* Form */}
      <View className="flex-1 px-6 py-4">
        <View className="mb-4">
          <Text className="text-sm font-medium text-fg mb-1.5">Event title</Text>
          <Input
            placeholder="What happened?"
            value={title}
            onChangeText={setTitle}
            autoFocus
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm font-medium text-fg mb-1.5">Description (optional)</Text>
          <Input
            placeholder="Add more details..."
            value={description}
            onChangeText={setDescription}
            multiline
            className="h-24"
            style={{ textAlignVertical: 'top' }}
          />
        </View>

        <Button
          onPress={onSave}
          disabled={!title.trim()}
          className={!title.trim() ? 'opacity-50' : ''}
        >
          <Text>Save event</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
