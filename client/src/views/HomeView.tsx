import { useAPI } from "../hooks/useAPI";

export function HomeView() {
  const { data } = useAPI<{ text: string }>("");

  return (
    <>
      <p>{data()?.text ?? "Loading..."}</p>
    </>
  );
}
