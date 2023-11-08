import clsx from "clsx";
import style from "./StoryContent.module.css";
import { createMemo, For } from "solid-js";
import { useStoryContext } from "../contexts/StoryContext";
import { useGlobalSettingsContext } from "../contexts/GlobalSettingsContext";

export function StoryContent() {
  const [story] = useStoryContext();
  const [settings] = useGlobalSettingsContext();

  const lines = createMemo(() => {
    let content = story.content;
    if (story.isStreaming) {
      content += story.stream;
    }
    return content.split("\n");
  });

  return (
    <div class={clsx(style.message, style[settings.paragraphStyle])}>
      <For each={lines()}>{(line) => <p>{line}</p>}</For>
    </div>
  );
}
