import { Story } from "../types/Story";
import { useAPI } from "./useAPI";

type StoriesResponse = {
  stories: Story[];
};

export const useStories = () => useAPI<StoriesResponse>("/stories");
