import {
  HiSolidArrowRight,
  HiSolidArrowUturnLeft,
  HiSolidArrowUturnRight,
} from "solid-icons/hi";
import { Button } from "./Button";
import style from "./Toolbar.module.css";
import { TextArea } from "./TextArea";
import { createEffect } from "solid-js";
import { useStoryContext } from "../contexts/StoryContext";

type ToolbarProps = {
  disabled?: boolean;
};

export function Toolbar(props: ToolbarProps) {
  let textarea: HTMLTextAreaElement | undefined = undefined;
  const [story, { generateText, undo, redo }] = useStoryContext();

  createEffect((wasStreaming) => {
    if (!wasStreaming && story.isStreaming) {
      if (textarea) {
        textarea.value = "";
      }
    }
    return story.isStreaming;
  });

  function handleKeyUp(event: KeyboardEvent) {
    // Handle keyboard submit
    if (event.ctrlKey && event.key === "Enter") {
      generateText();
      event.preventDefault();
    }
  }

  function handleUndo() {
    undo();
    if (textarea) {
      textarea.value = "";
    }
  }

  function handleRedo() {
    redo();
    if (textarea) {
      textarea.value = "";
    }
  }

  function handleSubmit(event: SubmitEvent) {
    generateText();
    event.preventDefault();
  }

  return (
    <form
      method="dialog"
      onKeyUp={handleKeyUp}
      onSubmit={handleSubmit}
      class={style.toolbar}
    >
      <Button
        variant="secondary"
        disabled={props.disabled}
        onClick={handleUndo}
        icon={HiSolidArrowUturnLeft}
      />
      <Button
        variant="secondary"
        disabled={props.disabled}
        onClick={handleRedo}
        icon={HiSolidArrowUturnRight}
      />
      <TextArea
        ref={textarea}
        disabled={props.disabled || story.isStreaming}
        autoresize
      />
      <Button
        type="submit"
        variant="primary"
        disabled={props.disabled || story.isStreaming}
        icon={HiSolidArrowRight}
      />
    </form>
  );
}
