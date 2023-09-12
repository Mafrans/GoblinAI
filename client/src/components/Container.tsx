import style from "./Container.module.css";

type ContainerProps = {
  children: Element | null;
};

export function Container({ children }: ContainerProps) {
  return <div class={style.container}>{children}</div>;
}
