import { Route, Routes } from "@solidjs/router";
import "./App.css";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { HomeView } from "./views/HomeView";

function App() {
  return (
    <>
      <DevModeIndicator />
      <Routes>
        <Route path="/" component={HomeView} />
      </Routes>
    </>
  );
}

export default App;
