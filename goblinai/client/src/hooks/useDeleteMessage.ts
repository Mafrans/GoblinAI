import { apiFetch } from "./useAPI";

export const useDeleteMessage = (storyId: string) => (messageIndex: number) =>
  apiFetch<void>(`/stories/${storyId}/messages/${messageIndex}/`, {
    method: "DELETE",
  });
