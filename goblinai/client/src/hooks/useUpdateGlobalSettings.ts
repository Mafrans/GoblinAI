import { Settings } from "../types/Settings";
import { apiFetch } from "./useAPI";

type UpdateSettingsBody = Partial<Settings>;

export const useUpdateGlobalSettings = () => (settings: Partial<Settings>) =>
  apiFetch<Settings, UpdateSettingsBody>("/settings/", {
    method: "POST",
    body: settings,
  });
