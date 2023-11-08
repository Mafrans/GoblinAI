import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Layout } from "../layouts/Layout";
import style from "./SettingsView.module.css";
import { Select } from "../components/Select.tsx";
import { Suspense } from "solid-js";
import { Loader } from "../components/Loader.tsx";
import { ParagraphStyle } from "../types/ParagraphStyle.ts";
import { useGlobalSettingsContext } from "../contexts/GlobalSettingsContext.tsx";

type SettingsViewProps = {};

export function SettingsView({}: SettingsViewProps) {
  const [settings, { setParagraphStyle }] = useGlobalSettingsContext();

  useDocumentTitle("Settings");

  return (
    <Layout class={style.settings}>
      <main class={style.content}>
        <Container>
          <h1 class="headline-1">Settings</h1>

          <Suspense fallback={<Loader />}>
            <Select
              label="Paragraph style"
              default={settings.paragraphStyle}
              options={{
                indent: "Indent before paragraphs",
                margin: "Margin between paragraphs",
              }}
              onSelect={(v) => setParagraphStyle(v as ParagraphStyle)}
            />
          </Suspense>
        </Container>
      </main>
    </Layout>
  );
}
