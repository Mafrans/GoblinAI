import { Component, JSX } from "solid-js";
import style from "./Container.module.css";
import clsx from "clsx";
import { Dynamic } from "solid-js/web";

type ContainerProps = {
  children?: JSX.Element;
  as?: keyof JSX.HTMLElementTags | Component;
  hasPadding?: boolean;
  class?: string;
};

export function Container({
  children,
  class: className,
  hasPadding = true,
  as = "div",
}: ContainerProps) {
  return (
    <Dynamic
      component={as}
      class={clsx(style.container, hasPadding && style.hasPadding, className)}
    >
      {children}
    </Dynamic>
  );
}
