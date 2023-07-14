import { Fragment, useMemo, useRef } from "react";
import { Pressable, View } from "react-native";
import { RenderTimelineEvent } from "./render-timeline-event";
import { useNavigation } from "@react-navigation/native";
import { eventsDateSorter } from "../../lib/utils";
import { useFetchTimeline, useTimeline } from "../../store";
import { Spacer, Palette, Text } from "../../ui/atoms";
import { Skeleton } from "../../ui/molecules/skeleton";
import { useTranslation } from "react-i18next";

export const TimelineCompactView = ({ id }: { id: string }) => {
  const { value } = useFetchTimeline(id);
  const { timeline } = useTimeline();
  const navigation = useNavigation();
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
      <>
        <View>
          <Skeleton>
            <Skeleton.Placeholder
              width={"80%"}
              height={15}
              variant="rectangle"
            />
            <Spacer size="8" />
            <Skeleton.Placeholder
              width={"70%"}
              height={15}
              variant="rectangle"
            />
            <Spacer size="8" />
            <Skeleton.Placeholder
              width={"50%"}
              height={15}
              variant="rectangle"
            />
          </Skeleton>
        </View>
      </>
    );

  if (value.state === "hasError")
    return <Text size="body">{t("general.loading_data.error")}</Text>;

  return (
    <>
      <Pressable
        onPress={() => {
          //@ts-ignore
          navigation.navigate<any>("Timeline/Default", {
            todoUID: id,
          });
        }}
      >
        {normalizeData.map((item, index) => (
          <Fragment key={String(index)}>
            <RenderTimelineEvent
              date={Number(item.timestamp)}
              description={item.title}
              compact
              showVerticalLine={ref.current !== index + 1}
            />
            {ref.current !== index + 1 && <Spacer size="8" />}
          </Fragment>
        ))}
      </Pressable>
      {normalizeData.length !== 0 && <Spacer size="8" />}
      <Pressable
        onPress={() => {
          //@ts-ignore
          navigation.navigate<any>("Timeline/AddEvent", {
            todoUID: id,
          });
        }}
      >
        <Text size="body" weight="medium" colour={Palette.primary.P300}>
          {t("todo.button.add_timeline_event")}
        </Text>
      </Pressable>
    </>
  );
};
