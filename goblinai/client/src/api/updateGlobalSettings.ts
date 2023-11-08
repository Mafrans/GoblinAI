import { GlobalSettings } from "../types/GlobalSettings";
import { apiFetch } from "./api";

type UpdateSettingsBody = Partial<GlobalSettings>;

export const updateGlobalSettings = (settings: Partial<GlobalSettings>) =>
  apiFetch<GlobalSettings, UpdateSettingsBody>("/settings/", {
    method: "POST",
    body: settings,
  });
