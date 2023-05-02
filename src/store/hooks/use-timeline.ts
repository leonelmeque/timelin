import { useAtom } from 'jotai';
import { timelineState } from '../todos/timeline.store';
import { TimelineEventProps } from '../../lib/shared-types';

export const useTimeline = () => {
  const [timeline, setTimeline] = useAtom(timelineState);

  const handleAddTimeline = (newEvent: TimelineEventProps) => {
    setTimeline((prev) => prev.concat(newEvent));
  };

  const handleDeleteTimeline = (id: string) => {
    setTimeline((prev) => {
      const newTimeline = prev.filter((item) => item.id !== id);
      return newTimeline;
    });
  };

  const handleSyncTimeline = (id: string, update: TimelineEventProps) => {
    setTimeline((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      const freshData = prev;
      freshData[index] = update;
      return freshData;
    });
  };

  return {
    timeline,
    handleAddTimeline,
    handleSyncTimeline,
    handleDeleteTimeline,
  };
};
