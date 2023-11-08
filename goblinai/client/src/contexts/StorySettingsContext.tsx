import { JSX, createContext, createEffect, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { StorySettings } from "../types/StorySettings";
import { getStorySettings } from "../api/getStorySettings";

type State = StorySettings;

type Actions = {};

type StorySettingsProviderProps = {
  children: JSX.Element;
  storyId: string;
};

const defaultState: State = {};

export const StorySettingsContext = createContext<[State, Actions]>([
  defaultState,
  { setParagraphStyle: () => {} },
]);

export const useStorySettings = () => useContext(StorySettingsContext);

export function StorySettingsProvider(props: StorySettingsProviderProps) {
  const [state, setState] = createStore<State>(defaultState);

  createEffect(async () => {
    setState(await getStorySettings(props.storyId));
  });

  return (
    <StorySettingsContext.Provider value={[state, {}]}>
      {props.children}
    </StorySettingsContext.Provider>
  );
}
