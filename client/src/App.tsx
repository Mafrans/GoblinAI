import "./App.css";
import { DevModeIndicator } from "./components/DevModeIndicator";
import { useAPI } from "./hooks/useAPI";

function App() {
  const { data } = useAPI<{ text: string }>("");

  return (
    <>
      <DevModeIndicator />
      <div>
        <p>{data()?.text ?? "Loading..."}</p>
      </div>
    </>
  );
}

export default App;
