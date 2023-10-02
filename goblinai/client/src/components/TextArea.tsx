import { JSX, Show } from "solid-js";
import style from "./TextArea.module.css";
import clsx from "clsx";

type TextAreaProps = {
  label?: string;
  rows?: number;
  autoresize?: boolean;
  disabled?: boolean;
  children?: JSX.Element;
};

export function TextArea(props: TextAreaProps) {
  function handleAutoResize(event: InputEvent) {
    if (props.autoresize) {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.removeProperty("height");
      textarea.style.setProperty("height", `${textarea.scrollHeight}px`);
    }
  }

  return (
    <label class={style.textArea}>
      <Show when={props.label != null}>
        <span class={style.label}>{props.label}</span>
      </Show>
      <textarea
        disabled={props.disabled}
        class={clsx(props.autoresize && style.autoresize)}
        onInput={handleAutoResize}
        rows={props.rows ?? 1}
      >
        {props.children}
      </textarea>
    </label>
  );
}
