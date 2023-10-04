import { IconTypes } from "solid-icons";
import style from "./Button.module.css";
import clsx from "clsx";
import { Dynamic, Show } from "solid-js/web";
import { JSX } from "solid-js";
import { splitProps } from "solid-js";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconTypes;
  leadingIcon?: IconTypes;
  trailingIcon?: IconTypes;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "link";
};

export function Button(allProps: ButtonProps) {
  const [props, buttonProps] = splitProps(allProps, [
    "icon",
    "leadingIcon",
    "trailingIcon",
    "disabled",
    "variant",
  ]);

  return (
    <button
      {...buttonProps}
      disabled={props.disabled}
      class={clsx(
        style.button,
        style[props.variant ?? "secondary"],
        buttonProps.class
      )}
    >
      <div class={style.content}>
        <Dynamic component={props.leadingIcon ?? props.icon} size={20} />
        <Show when={buttonProps.children != null}>
          <span class={style.text}>{buttonProps.children}</span>
        </Show>
        <Dynamic component={props.trailingIcon} size={20} />
      </div>
    </button>
  );
}
