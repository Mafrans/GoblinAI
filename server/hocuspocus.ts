import {
  Hocuspocus,
  type onChangePayload,
  type onLoadDocumentPayload,
  type onStoreDocumentPayload,
} from "@hocuspocus/server";
import { Transformer } from "goblinai/tiptap";
import { debounce } from "goblinai/util";
import { openStories } from ".";
import { createStory, loadStory, saveStory } from "./story";
import * as Y from "yjs";

async function onLoadDocument(data: onLoadDocumentPayload) {
  const story = await loadStory(data.documentName);
  if (!story) return;

  openStories.set(data.documentName, story);

  if (story.content.byteLength !== 0)
    Y.applyUpdate(data.document, story.content);
}

async function onStoreDocument({
  documentName,
  document,
}: onStoreDocumentPayload) {
  let story = openStories.get(documentName);

  // If story not in cache, try to load it from disk
  if (!story) story = await loadStory(documentName);

  // If story still not found, create a new one
  if (!story) story = createStory({ id: documentName });

  const update = Y.encodeStateAsUpdate(document);
  story.content = update;

  await saveStory(story);
}

async function onChange({ update, documentName }: onChangePayload) {
  const story = openStories.get(documentName);
  if (!story) return;

  story.content = update;
}

const onChangeDebounced = debounce(onChange, 1000);

const hocuspocus = new Hocuspocus({
  port: 1234,
  async onAuthenticate({ token }) {
    return {
      id: 1,
      name: "John Doe",
    };
  },
  extensions: [],
  onChange: onChangeDebounced,
  onLoadDocument,
  onStoreDocument,
});

export function startHocuspocus() {
  hocuspocus.listen();
}

export function stopHocuspocus() {
  hocuspocus.destroy();
}
