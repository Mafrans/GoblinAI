import { JSX } from "solid-js";
import style from "./Page.module.css";

type PageProps = {
  children: JSX.Element;
};

export function Page(props: PageProps) {
  return <div class={style.page}>{props.children}</div>;
}
