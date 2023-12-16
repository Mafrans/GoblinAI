import { apiFetch } from "./api";

export const undo = (storyId: string) =>
  apiFetch<string>(`/stories/${storyId}/content/undo`, { method: "POST" });
