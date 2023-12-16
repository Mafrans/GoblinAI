import { apiFetch } from "./api";

export const redo = (storyId: string) =>
  apiFetch<string>(`/stories/${storyId}/content/redo`, { method: "POST" });
