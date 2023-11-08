import { JSX, createContext, createEffect, useContext } from "solid-js";
import { GlobalSettings } from "../types/GlobalSettings";
import { ParagraphStyle } from "../types/ParagraphStyle";
import { createStore } from "solid-js/store";
import { getGlobalSettings } from "../api/getGlobalSettings";
import { updateGlobalSettings } from "../api/updateGlobalSettings";

type State = GlobalSettings;

type Actions = {
  setParagraphStyle: (paragraphStyle: ParagraphStyle) => void;
};

type GlobalSettingsProviderProps = {
  children: JSX.Element;
};

const defaultState: State = {
  paragraphStyle: ParagraphStyle.INDENT,
};

export const GlobalSettingsContext = createContext<[State, Actions]>([
  defaultState,
  { setParagraphStyle: () => {} },
]);

export const useGlobalSettingsContext = () => useContext(GlobalSettingsContext);

export function GlobalSettingsProvider(props: GlobalSettingsProviderProps) {
  const [state, setState] = createStore<State>(defaultState);

  createEffect(async () => {
    setState(await getGlobalSettings());
  });

  async function setParagraphStyle(paragraphStyle: ParagraphStyle) {
    setState({ paragraphStyle });
    updateGlobalSettings({ paragraphStyle });
  }

  return (
    <GlobalSettingsContext.Provider value={[state, { setParagraphStyle }]}>
      {props.children}
    </GlobalSettingsContext.Provider>
  );
}
