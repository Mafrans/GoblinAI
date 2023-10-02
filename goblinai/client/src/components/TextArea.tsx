import { JSX, Show } from "solid-js";
import style from "./TextArea.module.css";
import clsx from "clsx";

type TextAreaProps = {
  label?: string;
  rows?: number;
  autoresize?: boolean;
  disabled?: boolean;
  children?: JSX.Element;
  ref?: HTMLTextAreaElement;
  onSubmit?: (value: string) => void;
};

export function TextArea(props: TextAreaProps) {
  function handleInput(event: InputEvent) {
    if (props.autoresize) {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.removeProperty("height");
      textarea.style.setProperty("height", `${textarea.scrollHeight}px`);
    }
  }

  function handleKeyUp(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "Enter") {
      props.onSubmit?.(props.ref?.value ?? "");
      event.preventDefault();
      return;
    }
  }

  return (
    <label class={style.textArea}>
      <Show when={props.label != null}>
        <span class={style.label}>{props.label}</span>
      </Show>
      <textarea
        ref={props.ref}
        disabled={props.disabled}
        class={clsx(props.autoresize && style.autoresize)}
        onInput={handleInput}
        onKeyUp={handleKeyUp}
        rows={props.rows ?? 1}
      >
        {props.children}
      </textarea>
    </label>
  );
}
