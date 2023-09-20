import { IconTypes } from "solid-icons";
import style from "./Button.module.css";
import clsx from "clsx";

type ButtonProps = {
  children?: string;
  icon?: IconTypes;
  type?: "primary" | "secondary" | "link";
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const Icon = props.icon;

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    props.onClick?.();
  }

  return (
    <button
      class={clsx(
        style.button,
        style[props.type ?? "secondary"],
        props.icon && !props.children && style.iconButton
      )}
      onClick={handleClick}
    >
      {Icon && <Icon size={16} />}
      {props.children}
    </button>
  );
}
