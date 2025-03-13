<script lang="ts">
  import { Editor } from "@tiptap/core";
  import { onDestroy, onMount } from "svelte";
  import DocumentExtension from "@tiptap/extension-document";
  import ParagraphExtension from "@tiptap/extension-paragraph";
  import TextExtension from "@tiptap/extension-text";
  import Collaboration from "@tiptap/extension-collaboration";
  import * as Y from "yjs";
  import { HocuspocusProvider } from "@hocuspocus/provider";

  const doc = new Y.Doc();

  let provider: HocuspocusProvider | undefined = undefined;
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

    provider = new HocuspocusProvider({
      name: "document.name",
      url: "ws://127.0.0.1:1234",
      token: "notoken",
      document: doc,
    });
  });

  onDestroy(() => {
    editor?.destroy();
  });
</script>

<div bind:this={element}></div>
