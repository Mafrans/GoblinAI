import { Container } from "../components/Container";
import style from "./DashboardView.module.css";

export function DashboardView() {
  return (
    <div class={style.dashboard}>
      <Container as="header">
        <h1 class="headline-1">Hello</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse nihil
          praesentium sequi modi dolores cumque, totam recusandae magni harum,
          earum, labore fuga animi? Eum, et ea nisi deleniti ipsam quasi?
        </p>
      </Container>

      <main>
        <Container></Container>
      </main>
    </div>
  );
}
