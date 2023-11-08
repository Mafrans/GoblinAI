import { Story } from "../types/Story";
import { apiFetch } from "./api";

export const deleteStory = (id: string) =>
  apiFetch<Story[]>(`/stories/${id}/`, {
    method: "DELETE",
  });
