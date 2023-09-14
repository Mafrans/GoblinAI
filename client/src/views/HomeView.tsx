import { Container } from "../components/Container";
import { useAPI } from "../hooks/useAPI";

export function HomeView() {
  const { data } = useAPI<{ text: string }>("", (data) => {
    document.title = data.text;
  });

  return (
    <Container>
      <h1 class="headline-1">{data()?.text ?? "Loading..."}</h1>
    </Container>
  );
}
