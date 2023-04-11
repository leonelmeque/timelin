import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { timelineState } from '../todos/timeline.store';
import { TimelineEventProps, api } from '@todo/commons';

export const useFetchTimeline = (uid: string) => {
  const [loading, setLoading] = useState('loading');
  const [timeline, setTimeline] = useAtom(timelineState);
  const resetCacheData = useCallback(() => { }, []);

  useEffect(() => {
    api.timeline
      .getTimeline(uid)
      .then((data) => {
        setLoading('hasData');
        setTimeline(data as TimelineEventProps[]);
      })
      .catch(() => {
        setLoading('hasError');
      });
  }, []);

  return {
    value: {
      state: loading,
      data: timeline,
    },
    resetCacheData,
  };
};
