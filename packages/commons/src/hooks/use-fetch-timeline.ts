import { useEffect, useState } from 'react';
import { api } from '../api';
import { normalizeTimeline } from '../utils/normalize-timeline';

export const useFetchTimeline = (id: string) => {
  const [data, setData] = useState<any>(null);
  const [todo, setTodo] = useState<string>('');

  useEffect(() => {
    if (!data) {
      api.timeline.getTimeline(id).then((result) => {
        const timeline = normalizeTimeline(result);
        setTodo(result.todo);
        setData(timeline);
      });
    }
  });

  return [data as ReturnType<typeof normalizeTimeline>, todo] as const;
};
