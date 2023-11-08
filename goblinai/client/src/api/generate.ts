import { apiStream } from "./api";

export const generate = (storyId: string, startContent: string = "") =>
  apiStream(`/stories/${storyId}/content/`, {
    method: "POST",
    body: { startContent },
  });
