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

  return (
    <Layout class={style.story}>
      <Container>
        {id}
        <Page />
      </Container>
    </Layout>
  );
}
