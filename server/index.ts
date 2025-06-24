import type { Story } from "goblinai/models/Story";
import { startHocuspocus } from "./hocuspocus";
import { randBook } from "@ngneat/falso";
import { createStory, saveStory } from "./story";
import { loadConfig } from "./config";
import { createOpenAIClient } from "./openai";
import { startAPI } from "./api";

export const openStories = new Map<string, Story>();

startHocuspocus();
startAPI();
