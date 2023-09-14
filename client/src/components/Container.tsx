import { JSX } from "solid-js";
import style from "./Container.module.css";

type ContainerProps = {
  children: JSX.Element;
};

export function Container({ children }: ContainerProps) {
  return <div class={style.container}>{children}</div>;
}
