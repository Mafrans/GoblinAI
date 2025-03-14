import { mkdir } from "node:fs/promises";
import { Value } from "@sinclair/typebox/value";
import { StorySchema, type Story } from "goblinai/models/Story";
import path from "node:path";
import dayjs from "dayjs";
import { randBook } from "@ngneat/falso";

const STORY_DIR = path.join(".", "story");

function getStoryPath(id: string) {
  return path.join(STORY_DIR, `${id}.json`);
}

function getStoryFile(id: string) {
  return Bun.file(getStoryPath(id));
}

export async function loadStory(id: string): Promise<Story | undefined> {
  const file = getStoryFile(id);

  const exists = await file.exists();
  if (!exists) return undefined;

  const data: Story = await file.json();
  if (!data) return undefined;

  const story = decodeStory(data);
  return story;
}

export async function saveStory(story: Story): Promise<boolean> {
  const storyPath = getStoryPath(story.id);
  const file = getStoryFile(story.id);
  const data = encodeStory(story);

  await mkdir(path.dirname(storyPath), { recursive: true });
  const json = JSON.stringify(data);
  const responseCode = await file.write(json);

  return responseCode !== -1;
}

export function createStory({
  id = Bun.randomUUIDv7(),
  title = randBook().title,
}): Story {
  return Value.Default(StorySchema, { id, title }) as Story;
}

function encodeStory(story: Story) {
  return {
    ...story,
    content: story.content.toBase64(),
  };
}

function decodeStory(data: any): Story {
  return {
    ...data,
    content: Buffer.from(data.content, "base64"),
  };
}
