import { createMemo } from "solid-js";
import { Message } from "./Message";
import { ParagraphStyle } from "../types/ParagraphStyle";

type MessageStreamProps = {
  stream?: string;
  paragraphStyle?: ParagraphStyle;
};

export function MessageStream(props: MessageStreamProps) {
  const message = createMemo(() => ({
    createdAt: "",
    editedAt: "",
    content: props.stream ?? "",
  }));

  return <Message paragraphStyle={props.paragraphStyle} message={message()} />;
}
