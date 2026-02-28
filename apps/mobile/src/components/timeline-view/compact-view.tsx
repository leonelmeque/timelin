import { Fragment, useMemo, useRef } from "react";
import { Pressable, View } from "react-native";
import { RenderTimelineEvent } from "./render-timeline-event";
import { useRouter } from "expo-router";
import { eventsDateSorter } from "../../lib/utils";
import { useFetchTimeline, useTimeline } from "../../store";
import { Text } from '@/components/ui/text';
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export const TimelineCompactView = ({ id }: { id: string }) => {
  const { value } = useFetchTimeline(id);
  const { timeline } = useTimeline();
  const router = useRouter();
  const { t } = useTranslation();
  const ref = useRef(1);

  const normalizeData = useMemo(() => {
    let arr: any[] = [];

    if (value.state === "loading" || value.state === "hasError") {
      return arr;
    }

    if (timeline.length === 0) {
      ref.current = 0;
      return arr;
    } else if (timeline.length <= 4) {
      arr = timeline.slice();
      ref.current = arr.length;
      return eventsDateSorter(arr);
    }

    arr = timeline.slice(timeline.length - 4, timeline.length);
    ref.current = arr.length;

    return eventsDateSorter(arr);
  }, [value, timeline]);

  if (value.state === "loading")
    return (
      <View className="gap-4">
        <Skeleton style={{ width: "80%", height: 15 }} />
        <Skeleton style={{ width: "70%", height: 15 }} />
        <Skeleton style={{ width: "50%", height: 15 }} />
      </View>
    );

  if (value.state === "hasError")
    return <Text>{t("general.loading_data.error")}</Text>;

  return (
    <>
      <Pressable
        onPress={() => {
          router.push(`/timeline/${id}`);
        }}
      >
        {normalizeData.map((item, index) => (
          <Fragment key={String(index)}>
            <RenderTimelineEvent
              date={item.timestamp}
              description={item.title}
              compact
              showVerticalLine={ref.current !== index + 1}
            />
            {ref.current !== index + 1 && <View className="h-4" />}
          </Fragment>
        ))}
      </Pressable>
      {normalizeData.length !== 0 && <View className="h-4" />}
      <Pressable
        onPress={() => {
          router.push(`/timeline/${id}/add-event`);
        }}
      >
        <Text className="font-medium text-primary-300">
          {t("todo.button.add_timeline_event")}
        </Text>
      </Pressable>
    </>
  );
};
