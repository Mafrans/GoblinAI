import { apiStream } from "./useAPI";

export const useGenerateMessage =
  (storyId: string) => (startContent?: string) =>
    apiStream(`/stories/${storyId}/messages/`, {
      method: "POST",
      body: { startContent },
    });
