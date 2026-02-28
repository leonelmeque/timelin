import { create } from 'zustand';
import { TimelineEventProps } from '../../lib/shared-types';
import { api } from '../../lib/api';

type TimelineState = {
  timeline: TimelineEventProps[];
  loadingState: 'loading' | 'hasData' | 'hasError';

  fetchTimeline: (uid: string) => Promise<void>;
  addEvent: (event: TimelineEventProps) => void;
  deleteEvent: (id: string) => void;
  syncEvent: (id: string, update: TimelineEventProps) => void;
  resetTimeline: () => void;
};

export const useTimelineStore = create<TimelineState>((set) => ({
  timeline: [],
  loadingState: 'loading',

  fetchTimeline: async (uid) => {
    set({ loadingState: 'loading' });
    try {
      const data = await api.timeline.getTimeline(uid);
      set({ timeline: data as TimelineEventProps[], loadingState: 'hasData' });
    } catch {
      set({ loadingState: 'hasError' });
    }
  },

  addEvent: (event) => {
    set((state) => ({ timeline: state.timeline.concat(event) }));
  },

  deleteEvent: (id) => {
    set((state) => ({
      timeline: state.timeline.filter((item) => item.id !== id),
    }));
  },

  syncEvent: (id, update) => {
    set((state) => {
      const newTimeline = [...state.timeline];
      const index = newTimeline.findIndex((item) => item.id === id);
      newTimeline[index] = update;
      return { timeline: newTimeline };
    });
  },

  resetTimeline: () => {
    set({ timeline: [], loadingState: 'loading' });
  },
}));
