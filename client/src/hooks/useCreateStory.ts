import { Story } from "../types/Story";
import { apiFetch } from "./useAPI";

export const useCreateStory = () => () =>
  apiFetch<Story>("/stories/", {
    method: "POST",
  });
