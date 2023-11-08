import { GlobalSettings } from "../types/GlobalSettings";
import { apiFetch } from "./api";

export const getGlobalSettings = () => apiFetch<GlobalSettings>("/settings/");
