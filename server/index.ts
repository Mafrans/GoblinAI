import type { Story } from "goblinai/models/Story";
import { startHocuspocus } from "./hocuspocus";
import { randBook } from "@ngneat/falso";
import { createStory, saveStory } from "./story";
import { loadConfig } from "./config";

export const openStories = new Map<string, Story>();

const config = await loadConfig();
console.log({ config });

const story = createStory({
  id: "story1",
  title: "Story 1",
});
saveStory(story);

startHocuspocus();
