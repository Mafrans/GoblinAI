import style from "./DevModeIndicator.module.css";

export function DevModeIndicator() {
  if (!import.meta.env.DEV) {
    return null;
  }

  return <span class={style.devIcon}>Dev</span>;
}
