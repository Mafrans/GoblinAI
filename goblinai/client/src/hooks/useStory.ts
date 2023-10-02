import { Story } from "../types/Story";
import { createAPIResource } from "./useAPI";

export const useStory = (storyId: string) =>
  createAPIResource<Story>(`/stories/${storyId}/`);
