import "./App.css";
import { useAPIRequest } from "./hooks/useAPIRequest";

function App() {
  const { data } = useAPIRequest<{ text: string }>("");

  return (
    <>
      <div>
        <p>{data()?.text ?? "Loading..."}</p>
      </div>
    </>
  );
}

export default App;
