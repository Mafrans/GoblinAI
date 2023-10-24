import { createAPIResource } from "./useAPI";
import { Settings } from "../types/Settings";

export const useGlobalSettings = () =>
  createAPIResource<Settings>("/settings/");
