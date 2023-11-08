import { Story } from "../types/Story";
import { apiFetch } from "./api";

export const getStories = () => apiFetch<Story[]>("/stories/");
