import Elysia, { t } from "elysia";
import { createOpenAIClient } from "./openai";
import cors from "@elysiajs/cors";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
import { hocuspocus } from "./hocuspocus";
import { Transformer, Editor } from "goblinai/tiptap";
import { loadStory } from "./story";
import { JSDOM } from "jsdom";

const generateSchema = {};

function connectAndSync(storyId: string): Promise<[HocuspocusProvider, Y.Doc]> {
  return new Promise((resolve) => {
    const doc = new Y.Doc();
    const provider = new HocuspocusProvider({
      name: storyId,
      url: "ws://127.0.0.1:1234",
      token: "notoken",
      document: doc,
      onSynced() {
        resolve([provider, doc]);
      },
    });
  });
}

const storyApi = new Elysia({ prefix: "/story/:storyId" })
  .decorate("openai", await createOpenAIClient())
  .derive(async ({ params: { storyId } }) => {
    const jsdom = new JSDOM();
    global.document = jsdom.window.document;
    global.window = jsdom.window as any;
    const [provider, doc] = await connectAndSync(storyId);
    return {
      document: doc,
      provider,
      editor: new Editor({ document: doc }),
    };
  })
  .post(
    "/generate",
    async ({ store, openai, editor }) => {
      const content = editor.getHTML();
      const start = editor.$doc.range.to - 2;

      const stream = await openai.chat.completions.create({
        model: "gryphe/mythomax-l2-13b",
        stream: true,
        messages: [
          {
            role: "system",
            content:
              "You are a storywriting assistant, your task is to continue the story. Never end the story. Never deviate from the story. Never ask questions. Only respond with plaintext",
          },
          {
            role: "user",
            content: content,
          },
        ],
        max_tokens: 200,
      });

      let pos = start;
      for await (const chunk of stream) {
        let content = chunk.choices[0].delta.content ?? "";
        console.log({ content });
        if (content.endsWith("\n\n")) {
          content = content.slice(0, -"\n\n".length);
          editor.commands.enter();
        }
        editor.commands.insertContentAt(pos, content);
        pos += content.length;
      }
    },
    generateSchema,
  )
  .onAfterHandle(({ document, editor, provider }) => {
    editor.destroy();
    provider.destroy();
    document.destroy();
  });

const api = new Elysia().use(cors()).use(storyApi);

export function startAPI() {
  api.listen({
    port: 3000,
  });

  console.log("API running");
}
