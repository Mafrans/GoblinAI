import { createAPIResource } from "./useAPI";
import { Settings } from "../types/Settings";

export const useStorySettings = (storyId: string) =>
  createAPIResource<Settings>(`/settings/${storyId}`);
