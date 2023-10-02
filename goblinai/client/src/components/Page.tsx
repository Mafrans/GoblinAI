import { JSX } from "solid-js";
import style from "./Page.module.css";
import clsx from "clsx";

type PageProps = {
  children?: JSX.Element;
  class?: string;
};

export function Page(props: PageProps) {
  return <div class={clsx(style.page, props.class)}>{props.children}</div>;
}
