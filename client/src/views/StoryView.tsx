import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { For, createEffect, createSignal } from "solid-js";
import { useGenerateMessage } from "../hooks/useGenerateMessage";
import { Button } from "../components/Button";
import { HiSolidArrowRight } from "solid-icons/hi";
import { useMessages } from "../hooks/useMessages";
import { Message } from "../components/Message";
import { useStory } from "../hooks/useStory";
import { Toolbar } from "../components/Toolbar";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();
  const [story] = useStory(id);
  const [messages, { refetch }] = useMessages(id);
  const generateMessage = useGenerateMessage(id);
  const [stream, setStream] = createSignal<string>();

  createEffect(() => useDocumentTitle(story()?.name ?? id));

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
        <Page class={style.content}>
          <div class={style.messages}>
            <For each={messages()}>
              {(message) => <Message message={message} />}
            </For>
            <span>{stream()}</span>
          </div>

          <Toolbar onGenerate={handleGenerateMessage} />
        </Page>
      </Container>
    </Layout>
  );
}
