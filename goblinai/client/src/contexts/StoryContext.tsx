import { createContext, createEffect, useContext } from "solid-js";
import { Story } from "../types/Story";
import { createStore } from "solid-js/store";
import { JSX } from "solid-js";
import { updateStory } from "../api/updateStory";
import { generate } from "../api/generate";
import { getStory as getStory } from "../api/getStory";
import { getStoryContent } from "../api/getStoryContent";

type State = Story & {
  content: string;
  isStreaming: boolean;
  stream?: string;
};

type Actions = {
  setName: (name: string) => void;
  generateText: () => void;
};

type StoryProviderProps = {
  children: JSX.Element;
  id: string;
};

const defaultState: State = {
  id: "",
  name: "",
  createdAt: "",
  editedAt: "",
  content: "",
  isStreaming: false,
};

export const StoryContext = createContext<[State, Actions]>([
  defaultState,
  { setName: () => {}, generateText: () => {} },
]);

export const useStoryContext = () => useContext(StoryContext);

export function StoryProvider(props: StoryProviderProps) {
  const [state, setState] = createStore<State>(defaultState);

  createEffect(async () => {
    const story = await getStory(props.id);
    const content = await getStoryContent(props.id);
    setState({ ...story, content });
  });

  createEffect(() => {
    setState({
      isStreaming: state.stream != null,
    });
  });

  function setName(name: string) {
    setState("name", name);
    updateStory(props.id, { name });
  }

  async function generateText() {
    const reader = await generate(props.id);

    let stream = "";
    while (reader != null) {
      const { value, done } = await reader.read();
      if (done) break;

      stream += value;
      setState({ stream });
    }

    setState(({ content }) => ({
      content: content + stream,
      stream: undefined,
    }));
  }

  return (
    <StoryContext.Provider value={[state, { setName, generateText }]}>
      {props.children}
    </StoryContext.Provider>
  );
}
