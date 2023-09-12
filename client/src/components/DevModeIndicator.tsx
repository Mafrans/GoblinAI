import style from "./DevModeIndicator.module.css";

type DevModeIndicatorProps = {};

export function DevModeIndicator({}: DevModeIndicatorProps) {
  if (!import.meta.env.DEV) {
    return null;
  }

  return <span class={style.devIcon}>Dev</span>;
}
