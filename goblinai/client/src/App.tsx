import { Route, Routes } from "@solidjs/router";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { DashboardView } from "./views/DashboardView";
import { StoryView } from "./views/StoryView";
import { SettingsView } from "./views/SettingsView";

function App() {
  return (
    <>
      <DevModeIndicator />
      <Routes>
        <Route path="/" component={DashboardView} />
        <Route path="/settings" component={SettingsView} />
        <Route path="/story/:id" component={StoryView} />
      </Routes>
    </>
  );
}

export default App;
