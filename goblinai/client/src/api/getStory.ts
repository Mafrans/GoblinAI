import { Story } from "../types/Story";
import { apiFetch } from "./api";

export const getStory = (storyId: string) =>
  apiFetch<Story>(`/stories/${storyId}/`);
