import { JSX, Show, splitProps } from "solid-js";
import style from "./TextArea.module.css";
import clsx from "clsx";

type TextAreaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  autoresize?: boolean;
};

export function TextArea(allProps: TextAreaProps) {
  const [props, textareaProps] = splitProps(allProps, ["label", "autoresize"]);

  function handleInput(event: InputEvent) {
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
        {...textareaProps}
        class={clsx(props.autoresize && style.autoresize)}
        onInput={handleInput}
        rows={textareaProps.rows ?? 1}
      />
    </label>
  );
}
