import { createEffect, createSignal } from "solid-js";

let baseUrl = import.meta.env.DEV ? "http://localhost:8000" : location.origin;

export const useAPI = <T = unknown>(key: string, then?: (data: T) => void) => {
  const [data, setData] = createSignal<T>();

  createEffect(async () => {
    const newData = await fetcher(key);
    setData<T>(newData);
    then?.(newData);
  });

  return { data };
};

const fetcher = (key: string) =>
  fetch(`${baseUrl}/api${key}`).then((b) => b.json());
