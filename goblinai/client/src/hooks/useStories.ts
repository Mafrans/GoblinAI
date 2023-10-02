import { Story } from "../types/Story";
import { createAPIResource } from "./useAPI";

export const useStories = () => createAPIResource<Story[]>("/stories/");
