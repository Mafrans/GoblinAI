import { createResource } from "solid-js";

let baseUrl = import.meta.env.DEV ? "http://localhost:8000" : location.origin;

type FetchOptions<T = object> = Omit<RequestInit, "body"> & {
  body?: T;
};

export const createAPIResource = <Output = unknown>(
  key: string,
  options?: FetchOptions
) => createResource<Output>(() => apiFetch<Output>(key, options));

export const apiFetch = async <Output, Input = {}>(
  key: string,
  options?: FetchOptions<Input>
) => {
  if (import.meta.env.DEV) {
    await simulateLatency(import.meta.env.VITE_DEV_LATENCY ?? 0);
  }

  return fetch(`${baseUrl}/api${key}`, {
    ...options,
    body: JSON.stringify(options?.body),
  }).then((r) => r.json() as Output);
};

export const apiStream = async <Input = {}>(
  key: string,
  options?: FetchOptions<Input>
) =>
  fetch(`${baseUrl}/api${key}`, {
    ...options,
    body: JSON.stringify(options?.body),
  }).then((r) => r.body?.pipeThrough(new TextDecoderStream()).getReader());

async function simulateLatency(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
