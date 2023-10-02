import { IconTypes } from "solid-icons";
import style from "./Button.module.css";
import clsx from "clsx";
import { Dynamic, Show } from "solid-js/web";

type ButtonProps = {
  children?: string;
  icon?: IconTypes;
  leadingIcon?: IconTypes;
  trailingIcon?: IconTypes;
  disabled?: boolean;
  type?: "primary" | "secondary" | "link";
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  function handleClick(event: MouseEvent) {
    event.preventDefault();
    props.onClick?.();
  }

  return (
    <button
      disabled={props.disabled}
      class={clsx(style.button, style[props.type ?? "secondary"])}
      onClick={handleClick}
    >
      <div class={style.content}>
        <Dynamic component={props.leadingIcon ?? props.icon} size={20} />
        <Show when={props.children != null}>
          <span class={style.text}>{props.children}</span>
        </Show>
        <Dynamic component={props.trailingIcon} size={20} />
      </div>
    </button>
  );
}
