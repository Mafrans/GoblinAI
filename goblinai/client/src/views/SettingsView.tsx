import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Layout } from "../layouts/Layout";
import style from "./SettingsView.module.css";
import { Select } from "../components/Select.tsx";
import { useGlobalSettings } from "../hooks/useGlobalSettings.ts";
import { useUpdateGlobalSettings } from "../hooks/useUpdateGlobalSettings.ts";
import { Settings } from "../types/Settings.ts";
import { Show, Suspense } from "solid-js";
import { Loader } from "../components/Loader.tsx";
import { ParagraphStyle } from "../types/ParagraphStyle.ts";

type SettingsViewProps = {};

export function SettingsView({}: SettingsViewProps) {
  const [settings, { mutate }] = useGlobalSettings();
  const updateSettings = useUpdateGlobalSettings();

  useDocumentTitle("Settings");

  async function handleUpdateSettings(settings: Partial<Settings>) {
    const newSettings = await updateSettings(settings);
    mutate(newSettings);
  }

  return (
    <Layout class={style.settings}>
      <main class={style.content}>
        <Container>
          <h1 class="headline-1">Settings</h1>

          <Suspense fallback={<Loader />}>
            <Show when={settings.state == "ready"}>
              <Select
                label="Paragraph style"
                default={settings()?.paragraphStyle}
                options={{
                  indent: "Indent before paragraphs",
                  margin: "Margin between paragraphs",
                }}
                onSelect={(paragraphStyle) =>
                  handleUpdateSettings({
                    paragraphStyle: paragraphStyle as ParagraphStyle,
                  })
                }
              />
            </Show>
          </Suspense>
        </Container>
      </main>
    </Layout>
  );
}
