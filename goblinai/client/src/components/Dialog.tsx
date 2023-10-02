import { JSX, Show } from "solid-js";
import style from "./Dialog.module.css";
import { Transition } from "solid-transition-group";

type DialogProps = {
  open: boolean;
  onClickOutside?: () => void;
  title?: string;
  buttons?: JSX.Element;
  children?: JSX.Element;
};

export function Dialog(props: DialogProps) {
  function handleClickOutside(event: MouseEvent) {
    props.onClickOutside?.();
    event.preventDefault();
  }

  return (
    <Transition
      enterActiveClass={style.enterActive}
      exitActiveClass={style.exitActive}
      enterClass={style.enter}
      exitToClass={style.exitTo}
      onEnter={() => document.body.classList.add("no-scroll")}
      onExit={() => document.body.classList.remove("no-scroll")}
    >
      <Show when={props.open}>
        <div class={style.dialog}>
          <div class={style.overlay} onClick={handleClickOutside} />

          <article class={style.panel}>
            <Show when={props.title}>
              <header>{props.title}</header>
            </Show>

            <main>{props.children}</main>

            <Show when={props.buttons}>
              <footer>{props.buttons}</footer>
            </Show>
          </article>
        </div>
      </Show>
    </Transition>
  );
}
