import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { For, createSignal } from "solid-js";
import { useGenerateMessage } from "../hooks/useGenerateMessage";
import { Button } from "../components/Button";
import { HiSolidArrowRight } from "solid-icons/hi";
import { useMessages } from "../hooks/useMessages";
import { Message } from "../components/Message";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();
  const [messages, { refetch }] = useMessages(id);
  const generateMessage = useGenerateMessage(id);
  const [stream, setStream] = createSignal<string>();

  useDocumentTitle(id);

  async function handleGenerateMessage() {
    const reader = await generateMessage();
    let nextMessage = "";
    while (reader != null) {
      const { value, done } = await reader.read();
      if (done) break;

      nextMessage += value;
      setStream(nextMessage);
    }
    await refetch();
    setStream(undefined);
  }

  return (
    <Layout class={style.story}>
      <Container>
        <Page>
          <For each={messages()}>
            {(message) => <Message message={message} />}
          </For>
          <span>{stream()}</span>
        </Page>
        <Button
          type="primary"
          icon={HiSolidArrowRight}
          onClick={handleGenerateMessage}
        >
          Generate
        </Button>
      </Container>
    </Layout>
  );
}
