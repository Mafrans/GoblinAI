import { Show } from "solid-js";
import style from "./TextField.module.css";

type TextFieldProps = {
  type?: string;
  label?: string;
  placeholder?: string;
};

export function TextField(props: TextFieldProps) {
  const label = props.label;
  const type = props.type ?? "text";
  const placeholder = props.placeholder;

  return (
    <label class={style.textField}>
      <Show when={label != null}>
        <span class={style.label}>{label}</span>
      </Show>
      <input type={type} placeholder={placeholder} />
    </label>
  );
}
