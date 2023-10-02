import { apiStream } from "./useAPI";

export const useGenerateMessage = (storyId: string) => () =>
  apiStream(`/stories/${storyId}/messages`, {
    method: "POST",
  });
