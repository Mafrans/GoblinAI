import { Story } from "../types/Story";
import { apiFetch } from "./useAPI";

export function useDeleteStory(id?: string) {
  if (id === undefined) {
    return (id: string) =>
      apiFetch<Story[]>(`/stories/${id}/`, {
        method: "DELETE",
      });
  } else
    return () =>
      apiFetch<Story[]>(`/stories/${id}/`, {
        method: "DELETE",
      });
}
