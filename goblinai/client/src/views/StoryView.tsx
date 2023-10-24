import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { For, createEffect, createSignal, Show } from "solid-js";
import { useGenerateMessage } from "../hooks/useGenerateMessage";
import { useMessages } from "../hooks/useMessages";
import { Message } from "../components/Message";
import { useStory } from "../hooks/useStory";
import { Toolbar } from "../components/Toolbar";
import { MessageStream } from "../components/MessageStream";
import { useDeleteMessage } from "../hooks/useDeleteMessage";
import { useStorySettings } from "../hooks/useStorySettings";
import { useUpdateStorySettings } from "../hooks/useUpdateStorySettings";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  let textarea: HTMLTextAreaElement | undefined;
  const { id } = useParams<StoryViewParams>();
  const [story] = useStory(id);
  const [messages, { refetch: refetchMessages, mutate: mutateMessages }] =
    useMessages(id);
  const [settings] = useStorySettings(id);
  const updateSettings = useUpdateStorySettings(id);
  const generateMessage = useGenerateMessage(id);
  const deleteMessage = useDeleteMessage(id);
  const [stream, setStream] = createSignal<string>();

  createEffect(() => useDocumentTitle(story()?.name ?? id));

  async function handleGenerateMessage() {
    if (textarea == null) {
      return;
    }

    const reader = await generateMessage(textarea.value);
    textarea.value = "";

    let nextMessage = "";
    while (reader != null) {
      const { value, done } = await reader.read();
      if (done) break;

      nextMessage += value;
      setStream(nextMessage);
    }

    await refetchMessages();
    setStream(undefined);
  }

  async function handleRegenerateMessage() {
    const currentMessages = messages();
    if (currentMessages == null || currentMessages.length === 0) {
      return;
    }

    const lastMessageIndex = currentMessages.length - 1;
    currentMessages.splice(lastMessageIndex, 1);
    mutateMessages([...currentMessages]);

    await deleteMessage(lastMessageIndex);
  }

  return (
    <Layout class={style.story}>
      <Container>
        <Page class={style.content}>
          <div class={style.messages}>
            <For each={messages()}>
              {(message) => (
                <Message
                  message={message}
                  paragraphStyle={settings()?.paragraphStyle}
                />
              )}
            </For>

            <Show when={stream()}>
              <MessageStream
                stream={stream()}
                paragraphStyle={settings()?.paragraphStyle}
              />
            </Show>
          </div>

          <Toolbar
            ref={textarea}
            disabled={stream() != null || messages.loading}
            onGenerate={handleGenerateMessage}
            onRegenerate={handleRegenerateMessage}
          />
        </Page>
      </Container>
    </Layout>
  );
}
