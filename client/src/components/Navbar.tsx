import style from "./Navbar.module.css";
import Logo from "../assets/logo.svg";
import { Link } from "@solidjs/router";
import { Container } from "./Container";
import { ThemeSelect } from "./ThemeSelect";

type NavbarProps = {};

export function Navbar({}: NavbarProps) {
  return (
    <header class={style.navbar}>
      <Container class={style.content}>
        <Link class={style.brand} href="/">
          <Logo width={20} />
          <span>GoblinAI</span>
        </Link>
        <nav></nav>
        <ThemeSelect />
      </Container>
    </header>
  );
}
