import { createResource } from "solid-js";

let baseUrl = import.meta.env.DEV ? "http://localhost:8000" : location.origin;

type FetchOptions<T = object> = Omit<RequestInit, "body"> & {
  body?: T;
};

export const createAPIResource = <Output = unknown>(
  key: string,
  options?: FetchOptions
) => createResource<Output>(() => apiFetch<Output>(key, options));

export const apiFetch = <Output, Input = {}>(
  key: string,
  options?: FetchOptions<Input>
) =>
  fetch(`${baseUrl}/api${key}`, {
    ...options,
    body: JSON.stringify(options?.body),
  }).then((b) => b.json() as Output);
