import { StorySettings } from "../types/StorySettings";
import { apiFetch } from "./api";

export const getStorySettings = (storyId: string) =>
  apiFetch<StorySettings>(`/settings/${storyId}`);
