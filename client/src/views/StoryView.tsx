import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();
  document.title = `${id} - GoblinAI`;

  return (
    <Layout class={style.story}>
      <Container>
        <Page />
      </Container>
    </Layout>
  );
}
