import { Story } from "../types/Story";
import { apiFetch } from "./api";

export const updateStory = (id: string, body: Partial<Story>) =>
  apiFetch<Story, Partial<Story>>(`/stories/${id}/`, {
    method: "PATCH",
    body,
  });
