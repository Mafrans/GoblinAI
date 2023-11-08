import { Route, Routes } from "@solidjs/router";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { DashboardView } from "./views/DashboardView";
import { StoryView } from "./views/StoryView";
import { SettingsView } from "./views/SettingsView";
import { GlobalSettingsProvider } from "./contexts/GlobalSettingsContext";

function App() {
  return (
    <GlobalSettingsProvider>
      <DevModeIndicator />
      <Routes>
        <Route path="/" component={DashboardView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/story/:id" component={StoryView} />
      </Routes>
    </GlobalSettingsProvider>
  );
}

export default App;
