import { IconTypes } from "solid-icons";
import style from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
  children?: string;
  icon?: IconTypes;
  leadingIcon?: IconTypes;
  trailingIcon?: IconTypes;
  type?: "primary" | "secondary" | "link";
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const LeadingIcon = props.leadingIcon ?? props.icon;
  const TrailingIcon = props.trailingIcon;
  const children = props.children;

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    props.onClick?.();
  }

  return (
    <button
      class={clsx(style.button, style[props.type ?? "secondary"])}
      onClick={handleClick}
    >
      <div class={style.content}>
        {LeadingIcon && <LeadingIcon size={20} />}
        {children && <span class={style.text}>{children}</span>}
        {TrailingIcon && <TrailingIcon size={20} />}
      </div>
    </button>
  );
}
