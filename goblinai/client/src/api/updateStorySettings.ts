import { StorySettings } from "../types/StorySettings";
import { apiFetch } from "./api";

type UpdateSettingsBody = Partial<StorySettings>;

export const updateStorySettings = (
  storyId: string,
  settings: Partial<StorySettings>
) =>
  apiFetch<StorySettings, UpdateSettingsBody>(`/settings/${storyId}`, {
    method: "POST",
    body: settings,
  });
