import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { createSignal } from "solid-js";
import { useGenerateMessage } from "../hooks/useGenerateMessage";
import { Button } from "../components/Button";
import { HiSolidArrowRight } from "solid-icons/hi";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();
  const generateMessage = useGenerateMessage(id);
  const [content, setContent] = createSignal<string>("");
  const [generating, setGenerating] = createSignal<string>("");

  useDocumentTitle(id);

  async function handleGenerateMessage() {
    const reader = await generateMessage();
    while (reader != null) {
      const { value, done } = await reader.read();
      if (done) break;

      setGenerating(generating() + value);
    }
    setContent(content() + generating());
    setGenerating("");
  }

  return (
    <Layout class={style.story}>
      <Container>
        <Page>
          {content()}
          {generating()}
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
