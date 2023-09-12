import { createEffect, createSignal } from "solid-js";

let baseUrl = import.meta.env.DEV ? "http://localhost:8000" : location.origin;

export const useAPIRequest = <T = unknown>(key: string) => {
  const [data, setData] = createSignal<T>();

  createEffect(async () => {
    setData<T>(await fetcher(key));
  });

  return { data };
};

const fetcher = (key: string) =>
  fetch(`${baseUrl}/api${key}`).then((b) => b.json());
