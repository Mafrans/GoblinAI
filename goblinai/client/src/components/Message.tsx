import clsx from "clsx";
import style from "./Message.module.css";
import { createMemo, For } from "solid-js";

type MessageProps = {
  message: Message;
  paragraphStyle?: "indent" | "margin";
};

export function Message(props: MessageProps) {
  const lines = createMemo(() => props.message.content.split("\n"));

  return (
    <div class={clsx(style.message, style[props.paragraphStyle || "indent"])}>
      <For each={lines()}>{(line) => <p>{line}</p>}</For>
    </div>
  );
}
