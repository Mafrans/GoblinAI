import { JSX, Show } from "solid-js";
import style from "./TextArea.module.css";

type TextAreaProps = {
  label?: string;
  rows?: number;
  children?: JSX.Element;
};

export function TextArea(props: TextAreaProps) {
  const label = props.label;
  const rows = props.rows ?? 1;
  const children = props.children;

  return (
    <label class={style.textArea}>
      <Show when={label != null}>
        <span class={style.label}>{label}</span>
      </Show>
      <textarea rows={rows}>{children}</textarea>
    </label>
  );
}
