import { HiSolidMoon, HiSolidSun } from "solid-icons/hi";
import { createEffect, createMemo, createSignal } from "solid-js";
import style from "./ThemeSelect.module.css";
import clsx from "clsx";

type ThemeSelectProps = {};

const prefersLightMode = matchMedia("(prefers-color-scheme: light)");

export function ThemeSelect({}: ThemeSelectProps) {
  const [selectedTheme, setSelectedTheme] = createSignal(
    localStorage.getItem("theme")
  );
  const [preferredTheme, setPreferredTheme] = createSignal(
    prefersLightMode.matches ? "light" : "dark"
  );
  const theme = createMemo(() => selectedTheme() ?? preferredTheme());
  createEffect(() => document.body.setAttribute("theme", theme()));

  prefersLightMode.addEventListener("change", ({ matches }) =>
    setPreferredTheme(matches ? "light" : "dark")
  );

  function handleClick() {
    const nextTheme = theme() === "dark" ? "light" : "dark";
    setSelectedTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      onClick={handleClick}
      class={clsx(style.themeSelect, `theme-${theme()}`)}
    >
      <HiSolidSun class={style.sun} size={20} />
      <HiSolidMoon class={style.moon} size={20} />
    </button>
  );
}
