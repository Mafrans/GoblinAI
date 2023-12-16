import { createContext, createEffect, useContext } from "solid-js";
import { Story } from "../types/Story";
import { createStore } from "solid-js/store";
import { JSX } from "solid-js";
import { updateStory } from "../api/updateStory";
import { generate } from "../api/generate";
import { getStory } from "../api/getStory";
import { getStoryContent } from "../api/getStoryContent";
import { undo as apiUndo } from "../api/undo";
import { redo as apiRedo } from "../api/redo";

type State = Story & {
  content: string;
  isStreaming: boolean;
  stream?: string;
};

type Actions = {
  setName: (name: string) => void;
  generateText: () => void;
  undo: () => void;
  redo: () => void;
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
  { setName: () => {}, generateText: () => {}, undo: () => {}, redo: () => {} },
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

    while (reader != null) {
      const { value: stream, done } = await reader.read();
      if (done) break;

      setState({ stream });
    }

    setState(({ content, stream }) => ({
      content: content + stream,
      stream: undefined,
    }));
  }

  async function undo() {
    const content = await apiUndo(props.id);
    setState({ content });
  }

  async function redo() {
    const content = await apiRedo(props.id);
    setState({ content });
  }

  return (
    <StoryContext.Provider
      value={[state, { setName, generateText, undo, redo }]}
    >
      {props.children}
    </StoryContext.Provider>
  );
}
