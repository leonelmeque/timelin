import { useTimelineStore } from '../todos/timeline.store';
import { TimelineEventProps } from '../../lib/shared-types';

export const useTimeline = () => {
  const timeline = useTimelineStore((s) => s.timeline);
  const addEvent = useTimelineStore((s) => s.addEvent);
  const deleteEvent = useTimelineStore((s) => s.deleteEvent);
  const syncEvent = useTimelineStore((s) => s.syncEvent);

  const handleAddTimeline = (newEvent: TimelineEventProps) => {
    addEvent(newEvent);
  };

  const handleDeleteTimeline = (id: string) => {
    deleteEvent(id);
  };

  const handleSyncTimeline = (id: string, update: TimelineEventProps) => {
    syncEvent(id, update);
  };

  return {
    timeline,
    handleAddTimeline,
    handleSyncTimeline,
    handleDeleteTimeline,
  };
};
