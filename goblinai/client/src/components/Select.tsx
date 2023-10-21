import style from "./Select.module.css";
import {
  createEffect,
  createSignal,
  createUniqueId,
  For,
  onCleanup,
  Show,
} from "solid-js";
import { HiSolidChevronDown } from "solid-icons/hi";
import { Transition } from "solid-transition-group";

type SelectProps = {
  label?: string;
  placeholder?: string;
  default?: string;
  options: Record<string, string>;
  onSelect?: (value: string, previous: string) => void;
};

export function Select(props: SelectProps) {
  const [open, setOpen] = createSignal(false);
  const [selection, setSelection] = createSignal(props.default ?? "");
  const id = createUniqueId();
  let selectRef: HTMLSelectElement | undefined;

  function handleClick(event: MouseEvent) {
    setOpen(!open());

    event.preventDefault();
    event.stopPropagation();
  }

  function handleClickOutside() {
    setOpen(false);
  }

  createEffect(() => {
    if (selectRef != null) {
      if (selectRef.value != null || props.default == null) {
        props.onSelect?.(selection(), selectRef.value);
      }

      selectRef.value = selection();
    }
  });

  createEffect(() => {
    window.addEventListener("click", handleClickOutside);
    onCleanup(() => {
      window.removeEventListener("click", handleClickOutside);
    });
  });

  return (
    <div class={style.select}>
      <Show when={props.label != null}>
        <label for={id}>{props.label}</label>
      </Show>

      <button type="button" onClick={handleClick} class={style.button}>
        <span>{props.options[selection()] ?? props.placeholder}</span>
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
            <For each={Object.entries(props.options)}>
              {([key, value]) => (
                <button type="button" onClick={() => setSelection(key)}>
                  {value}
                </button>
              )}
            </For>
          </div>
        </Show>
      </Transition>

      <select tabIndex={-1} id={id} ref={selectRef}>
        <For each={Object.keys(props.options ?? {})}>
          {(key) => <option value={key}>{key}</option>}
        </For>
      </select>
    </div>
  );
}
