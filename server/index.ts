import type { Story } from "goblinai/models/Story";
import { startHocuspocus } from "./hocuspocus";
import { randBook } from "@ngneat/falso";
import { createStory, saveStory } from "./story";
import { loadConfig } from "./config";
import { createOpenAIClient } from "./openai";

export const openStories = new Map<string, Story>();

const openai = await createOpenAIClient();

const story = createStory({
  id: "story1",
  title: "Story 1",
});
saveStory(story);

startHocuspocus();
