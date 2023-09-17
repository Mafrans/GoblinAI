import style from "./Navbar.module.css";
import Logo from "../assets/logo.svg";
import { A } from "@solidjs/router";
import { ThemeSelect } from "./ThemeSelect";
import { Container } from "./Container";

type NavbarProps = {};

export function Navbar({}: NavbarProps) {
  return (
    <header class={style.navbar}>
      <div class={style.content}>
        <A class={style.brand} href="/">
          <Logo width={20} />
          <span>GoblinAI</span>
        </A>

        <Container as="nav" hasPadding={false} class={style.links}>
          <A href="/" end>
            Play
          </A>
          <A href="/settings">Settings</A>
        </Container>

        <div class={style.buttons}>
          <ThemeSelect />
        </div>
      </div>
    </header>
  );
}
