import { Container } from "../components/Container";
import { StoryList } from "../components/StoryList";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Layout } from "../layouts/Layout";
import style from "./DashboardView.module.css";

export function DashboardView() {
  useDocumentTitle("Play");

  return (
    <Layout class={style.dashboard}>
      <Container as="header" class={style.header}>
        <h1 class="headline-1">Welcome to GoblinAI</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nihil
          praesentium sequi modi dolores cumque, totam recusandae magni harum,
          earum, labore fuga animi? Eum, et ea nisi deleniti ipsam quasi?
        </p>
      </Container>

      <main class={style.content}>
        <Container>
          <h2 class="headline-2">Your stories</h2>
          <StoryList />
        </Container>
      </main>
    </Layout>
  );
}
