import { Route, Routes } from "@solidjs/router";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { DashboardView } from "./views/DashboardView";

function App() {
  return (
    <>
      <DevModeIndicator />
      <Routes>
        <Route path="/" component={DashboardView} />
      </Routes>
    </>
  );
}

export default App;
