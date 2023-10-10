import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Layout } from "../layouts/Layout";
import style from "./SettingsView.module.css";
import { Select } from "../components/Select.tsx";

type SettingsViewProps = {};

export function SettingsView({}: SettingsViewProps) {
  useDocumentTitle("Settings");

  return (
    <Layout class={style.settings}>
      <main class={style.content}>
        <Container>
          <h1 class="headline-1">Settings</h1>
          <Select
            label="Paragraph style"
            default="Indent before paragraphs"
            options={{
              "Indent before paragraphs": "indent",
              "Margin between paragraphs": "margin",
            }}
          />
        </Container>
      </main>
    </Layout>
  );
}
