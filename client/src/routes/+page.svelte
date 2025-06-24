<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as Y from "yjs";
  import { HocuspocusProvider } from "@hocuspocus/provider";
  import { Editor } from "goblinai/tiptap";

  const doc = new Y.Doc();

  let provider: HocuspocusProvider | undefined = undefined;
  let editor: Editor | undefined = undefined;
  let element: Element | undefined = undefined;

  async function handleGenerate() {
    const res = await fetch(`http://localhost:3000/story/story1/generate`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      console.error(await res.json());
    }
    console.log(await res.json());
  }

  onMount(() => {
    editor = new Editor({
      element,
      document: doc,
      onTransaction: ({ transaction }) => {
        editor = editor;
      },
    });

    provider = new HocuspocusProvider({
      name: "story1",
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
<button type="button" on:click={handleGenerate}>Generate</button>
