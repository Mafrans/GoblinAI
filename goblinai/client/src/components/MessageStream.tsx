import { createMemo } from "solid-js";
import { Message } from "./Message";

type MessageStreamProps = {
  stream?: string;
};

export function MessageStream(props: MessageStreamProps) {
  const message = createMemo(() => ({
    createdAt: "",
    editedAt: "",
    content: props.stream ?? "",
  }));

  return <Message message={message()} />;
}
