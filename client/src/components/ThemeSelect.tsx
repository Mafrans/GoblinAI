import { HiSolidMoon, HiSolidSun } from "solid-icons/hi";
import { createEffect, createSignal } from "solid-js";
import style from "./ThemeSelect.module.css";
import clsx from "clsx";

type ThemeSelectProps = {};

const prefersLightMode = matchMedia("(prefers-color-scheme: light)");

export function ThemeSelect({}: ThemeSelectProps) {
  const [lightMode, setLightMode] = createSignal(prefersLightMode.matches);

  createEffect(() =>
    document.body.setAttribute("theme", lightMode() ? "light" : "dark")
  );

  prefersLightMode.addEventListener("change", ({ matches }) =>
    setLightMode(matches)
  );

  function handleClick() {
    setLightMode(!lightMode());
  }

  return (
    <button
      onClick={handleClick}
      class={clsx(style.themeSelect, lightMode() && style.lightMode)}
    >
      <HiSolidSun class={style.sun} size={20} />
      <HiSolidMoon class={style.moon} size={20} />
    </button>
  );
}
