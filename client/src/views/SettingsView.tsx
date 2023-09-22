import { Container } from "../components/Container";
import { Layout } from "../layouts/Layout";
import style from "./SettingsView.module.css";

type SettingsViewProps = {};

export function SettingsView({}: SettingsViewProps) {
  document.title = "Settings - GoblinAI";

  return (
    <Layout class={style.settings}>
      <main class={style.content}>
        <Container>
          <h1 class="headline-1">Settings</h1>
        </Container>
      </main>
    </Layout>
  );
}
