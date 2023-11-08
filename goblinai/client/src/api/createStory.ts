import { Story } from "../types/Story";
import { apiFetch } from "./api";

export const createStory = () =>
  apiFetch<Story>("/stories/", {
    method: "POST",
  });
