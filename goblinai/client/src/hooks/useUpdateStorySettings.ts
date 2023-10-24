import { Settings } from "../types/Settings";
import { apiFetch } from "./useAPI";

type UpdateSettingsBody = Partial<Settings>;

export const useUpdateStorySettings =
  (storyId: string) => (settings: Partial<Settings>) =>
    apiFetch<Settings, UpdateSettingsBody>(`/settings/${storyId}`, {
      method: "POST",
      body: settings,
    });
