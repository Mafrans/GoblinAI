import { apiFetch } from "./api";

export const getStoryContent = (storyId: string) =>
  apiFetch<string>(`/stories/${storyId}/content/`);
