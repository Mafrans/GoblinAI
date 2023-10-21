import { Container } from "../components/Container";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Layout } from "../layouts/Layout";
import style from "./SettingsView.module.css";
import { Select } from "../components/Select.tsx";
import { useSettings } from "../hooks/useSettings.ts";
import { useUpdateSettings } from "../hooks/useUpdateSettings.ts";
import { Settings } from "../types/Settings.ts";
import { Show, Suspense } from "solid-js";
import { Loader } from "../components/Loader.tsx";

type SettingsViewProps = {};

export function SettingsView({}: SettingsViewProps) {
  const [settings, { mutate }] = useSettings();
  const updateSettings = useUpdateSettings();

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
                    paragraphStyle,
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
