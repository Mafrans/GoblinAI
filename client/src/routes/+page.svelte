<script lang="ts">
  import { Editor } from "@tiptap/core";
  import { onDestroy, onMount } from "svelte";
  import DocumentExtension from "@tiptap/extension-document";
  import ParagraphExtension from "@tiptap/extension-paragraph";
  import TextExtension from "@tiptap/extension-text";
  import Collaboration from "@tiptap/extension-collaboration";
  import * as Y from "yjs";
  import { TiptapCollabProvider } from "@hocuspocus/provider";

  const doc = new Y.Doc();

  let provider: TiptapCollabProvider | undefined = undefined;
  let editor: Editor | undefined = undefined;
  let element: Element | undefined = undefined;

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [
        DocumentExtension,
        ParagraphExtension,
        TextExtension,
        Collaboration.configure({
          document: doc,
        }),
      ],
      onTransaction: () => {
        editor = editor;
      },
    });

    provider = new TiptapCollabProvider({
      name: "document.name",
      appId: "127.0.0.1:1234",
      token: "notoken",
      document: doc,

      onSynced() {
        console.log("synced");
        if (!doc.getMap("config").get("initialContentLoaded") && editor) {
          doc.getMap("config").set("initialContentLoaded", true);
          editor.commands.setContent(`
            <p>This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.</p>
            <p>The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.</p>
          `);
        }
      },
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });
</script>

<div bind:this={element}></div>
