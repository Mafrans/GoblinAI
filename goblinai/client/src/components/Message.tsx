import style from "./Message.module.css";
import { createMemo, For } from "solid-js";

type MessageProps = {
  message: Message;
};

export function Message(props: MessageProps) {
  const lines = createMemo(() => props.message.content.split("\n"));

  return (
    <div class={style.message}>
      <For each={lines()}>{(line) => <p>{line}</p>}</For>
    </div>
  );
}
