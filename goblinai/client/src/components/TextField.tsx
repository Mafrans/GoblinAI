import { JSX, Show, splitProps } from "solid-js";
import style from "./TextField.module.css";

type TextFieldProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function TextField(allProps: TextFieldProps) {
  const [props, inputProps] = splitProps(allProps, ["label"]);

  return (
    <label class={style.textField}>
      <Show when={props.label != null}>
        <span class={style.label}>{props.label}</span>
      </Show>
      <input {...inputProps} />
    </label>
  );
}
