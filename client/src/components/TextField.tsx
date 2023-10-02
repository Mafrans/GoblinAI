import { Show } from "solid-js";
import style from "./TextField.module.css";

type TextFieldProps = {
  type?: string;
  label?: string;
  placeholder?: string;
};

export function TextField(props: TextFieldProps) {
  return (
    <label class={style.textField}>
      <Show when={props.label != null}>
        <span class={style.label}>{props.label}</span>
      </Show>
      <input type={props.type} placeholder={props.placeholder} />
    </label>
  );
}
