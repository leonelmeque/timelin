import { useCallback, useEffect } from 'react';
import { useTimelineStore } from '../todos/timeline.store';

export const useFetchTimeline = (uid: string) => {
  const timeline = useTimelineStore((s) => s.timeline);
  const loadingState = useTimelineStore((s) => s.loadingState);
  const fetchTimeline = useTimelineStore((s) => s.fetchTimeline);
  const resetTimeline = useTimelineStore((s) => s.resetTimeline);

  const resetCacheData = useCallback(() => {
    resetTimeline();
  }, []);

  useEffect(() => {
    fetchTimeline(uid);
  }, []);

  return {
    value: {
      state: loadingState,
      data: timeline,
    },
    resetCacheData,
  };
};
