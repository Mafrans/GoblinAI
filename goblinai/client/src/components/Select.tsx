import style from "./Select.module.css";
import {
  createEffect,
  createSignal,
  createUniqueId,
  For,
  Show,
} from "solid-js";
import { HiSolidChevronDown } from "solid-icons/hi";
import { Transition } from "solid-transition-group";

type SelectProps<T = string> = {
  label?: string;
  placeholder?: string;
  default?: string;
  options?: Record<string, T>;
  onSelect?: (value: T | undefined, previous: T | undefined) => void;
};

export function Select<T>(props: SelectProps<T>) {
  const [open, setOpen] = createSignal(false);
  const [selectedKey, setSelectedKey] = createSignal(props.default);
  const id = createUniqueId();
  let selectRef: HTMLSelectElement | undefined;

  createEffect(() => console.log(open()));

  function handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;

    const previousKey = selectedKey();
    let previousValue: T | undefined;
    if (previousKey != null) {
      previousValue = props.options?.[previousKey];
    }

    const newValue = props.options?.[selectElement.value];
    props.onSelect?.(newValue, previousValue);
    setSelectedKey(() => selectElement.value);
  }

  return (
    <div class={style.select}>
      <Show when={props.label != null}>
        <label for={id}>{props.label}</label>
      </Show>

      <button
        type="button"
        onClick={() => setOpen(!open())}
        class={style.button}
      >
        <span>{selectedKey() ?? props.placeholder}</span>
        <HiSolidChevronDown size={20} />
      </button>

      <Transition
        enterActiveClass={style.enterActive}
        exitActiveClass={style.exitActive}
        enterClass={style.enter}
        exitToClass={style.exitTo}
      >
        <Show when={open()}>
          <div class={style.options}>
            <For each={Object.keys(props.options ?? {})}>
              {(key) => <button type="button">{key}</button>}
            </For>
          </div>
        </Show>
      </Transition>

      <select id={id} onChange={handleChange} ref={selectRef}>
        <For each={Object.keys(props.options ?? {})}>
          {(key) => <option value={key}>{key}</option>}
        </For>
      </select>
    </div>
  );
}
