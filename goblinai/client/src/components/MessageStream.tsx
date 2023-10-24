import { createMemo } from "solid-js";
import { Message } from "./Message";

type MessageStreamProps = {
  stream?: string;
  paragraphStyle?: "indent" | "margin";
};

export function MessageStream(props: MessageStreamProps) {
  const message = createMemo(() => ({
    createdAt: "",
    editedAt: "",
    content: props.stream ?? "",
  }));

  return <Message paragraphStyle={props.paragraphStyle} message={message()} />;
}
