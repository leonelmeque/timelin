import { useEffect } from "react"
import { useAtom } from "jotai"
import { readWriteLatestChanged } from "../todos/todos.store";
import { api } from "../../lib";

export const useLatest = () => {
  const [latestChanged, setLatestChanged] = useAtom(readWriteLatestChanged)
  const updateLatestChanged = (id: string) => {
    setLatestChanged(id)
  };

  useEffect(() => {
    const fetchLatestChanged = async () => {
      try {
        const data = await api.todo.getLastestChanged() as {
          latestChanged: string
        }

        if (data.latestChanged) {
          setLatestChanged(data.latestChanged)
        }
      } catch (err) {
        console.error("Could not find latest changed")
      }
    };

    fetchLatestChanged();

    return () => { };
  }, []);

  return {
    latestChanged,
    updateLatestChanged,
  }
};
