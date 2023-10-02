import { Show } from "solid-js";
import style from "./TextField.module.css";

type TextFieldProps = {
  type?: string;
  label?: string;
  placeholder?: string;
  ref?: HTMLInputElement;
  onSubmit?: (value: string) => void;
};

export function TextField(props: TextFieldProps) {
  function handleKeyUp(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === "Enter") {
      props.onSubmit?.(props.ref?.value ?? "");
      event.preventDefault();
      return;
    }
  }

  return (
    <label class={style.textField}>
      <Show when={props.label != null}>
        <span class={style.label}>{props.label}</span>
      </Show>
      <input
        ref={props.ref}
        type={props.type}
        placeholder={props.placeholder}
        onKeyUp={handleKeyUp}
      />
    </label>
  );
}
