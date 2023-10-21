import { createAPIResource } from "./useAPI";
import { Settings } from "../types/Settings.ts";

export const useSettings = () => createAPIResource<Settings>("/settings/");
