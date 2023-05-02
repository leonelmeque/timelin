import { useRef, useState } from 'react';
import { CalendarRefProps } from '../calendar-modal-view';
import { TimelineEventProps, api } from '../../lib';
import { dateFormatter } from '../../lib/utils';
import { useTimeline } from '../../store';


export const useEventView = ({
  event,
  todoUID,
}: {
  event: TimelineEventProps | null;
  todoUID: string;
}) => {
  const [state, setState] = useState<TimelineEventProps | null>(event);
  const calendarRef = useRef<CalendarRefProps>(null);
  const clearTimeoutRef = useRef<null | any>(null);

  const { handleSyncTimeline } = useTimeline();

  const onFormChange = (value: string, inputName: string) => {
    if (!state) return;

    const newEvent = { ...state, [inputName]: value };
    setState(newEvent);

    if (!event) return;

    if (clearTimeoutRef.current) clearTimeout(clearTimeoutRef.current);
    clearTimeoutRef.current = setTimeout(async () => {
      try {
        await api.timeline.updateTimelineEvent(
          todoUID,
          state?.id as string,
          newEvent
        );

        handleSyncTimeline(state.id as string, newEvent);
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
    onFormChange(String(date?.getTime()), name || '');
    if (toggleModal) toggleModal();
  };

  const timestamp = !state?.timestamp
    ? dateFormatter(String(Date.now()))
    : dateFormatter(Number(state.timestamp));

  return {
    state,
    calendarRef,
    onFormChange,
    onPressToggleModalVisibility,
    onPressSaveDate,
    timestamp,
  };
};
