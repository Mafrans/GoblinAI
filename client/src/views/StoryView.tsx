import { useParams } from "@solidjs/router";
import { Layout } from "../layouts/Layout";
import style from "./StoryView.module.css";
import { Page } from "../components/Page";
import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

type StoryViewParams = {
  id: string;
};

export function StoryView() {
  const { id } = useParams<StoryViewParams>();

  useDocumentTitle(id);

  return (
    <Layout class={style.story}>
      <Container>
        <Page />
      </Container>
    </Layout>
  );
}
