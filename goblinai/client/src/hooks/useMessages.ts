import { createAPIResource } from "./useAPI";

export const useMessages = (storyId: string) =>
  createAPIResource<Message[]>(`/stories/${storyId}/messages/`);
