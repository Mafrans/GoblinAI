import { Route, Routes } from "@solidjs/router";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { DashboardView } from "./views/DashboardView";
import { StoryView } from "./views/StoryView";

function App() {
  return (
    <>
      <DevModeIndicator />
      <Routes>
        <Route path="/" component={DashboardView} />
        <Route path="/story/:id" component={StoryView} />
      </Routes>
    </>
  );
}

export default App;
