import { JSX, Show, createRenderEffect } from "solid-js";
import style from "./TextArea.module.css";
import clsx from "clsx";

type TextAreaProps = {
  label?: string;
  rows?: number;
  autoresize?: boolean;
  children?: JSX.Element;
};

export function TextArea(props: TextAreaProps) {
  const label = props.label;
  const rows = props.rows ?? 1;
  const children = props.children;
  const autoresize = props.autoresize ?? true;

  function handleAutoResize(event: InputEvent) {
    if (autoresize) {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.removeProperty("height");
      textarea.style.setProperty("height", `${textarea.scrollHeight}px`);
    }
  }

  return (
    <label class={style.textArea}>
      <Show when={label != null}>
        <span class={style.label}>{label}</span>
      </Show>
      <textarea
        class={clsx(autoresize && style.autoresize)}
        onInput={handleAutoResize}
        rows={rows}
      >
        {children}
      </textarea>
    </label>
  );
}
