import style from "./Message.module.css";

type MessageProps = {
  message: Message;
};

export function Message(props: MessageProps) {
  return <p class={style.message}>{props.message.content}</p>;
}
