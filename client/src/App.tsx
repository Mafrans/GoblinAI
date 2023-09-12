import { createEffect, createSignal } from "solid-js";
import "./App.css";

function App() {
  const [text, setText] = createSignal<string>();

  createEffect(async () => {
    const res = await fetch("http://localhost:8000/api");
    const { text } = await res.json();
    setText(text);
  });

  return (
    <>
      <div>
        <p>{text() ?? "Loading..."}</p>
      </div>
    </>
  );
}

export default App;
