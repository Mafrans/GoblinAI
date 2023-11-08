import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { StoryContent } from "../components/StoryContent";
import { Toolbar } from "../components/Toolbar";
import { StoryProvider } from "../contexts/StoryContext";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();

  return (
    <StoryProvider id={id}>
      <Layout class={style.story}>
        <Container>
          <Page class={style.content}>
            <StoryContent />
            <Toolbar />
          </Page>
        </Container>
      </Layout>
    </StoryProvider>
  );
}
