import { Setter, onCleanup } from "solid-js";

export function useDebounce<T>(setter: Setter<T>, delay: number) {
  let handle: NodeJS.Timeout;
  function debouncedSignalSetter(value: T) {
    clearTimeout(handle);
    handle = setTimeout(() => setter(() => value), delay);
  }
  onCleanup(() => clearInterval(handle));
  return debouncedSignalSetter;
}
