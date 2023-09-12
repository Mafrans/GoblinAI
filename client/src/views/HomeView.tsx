import { Container } from "../components/Container";
import { useAPI } from "../hooks/useAPI";

export function HomeView() {
  const { data } = useAPI<{ text: string }>("");

  return (
    <Container>
      <p>{data()?.text ?? "Loading..."}</p>
    </Container>
  );
}
