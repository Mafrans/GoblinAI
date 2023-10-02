import { Component, JSX } from "solid-js";
import { Navbar } from "../components/Navbar";
import { Dynamic } from "solid-js/web";

type LayoutProps = {
  children?: JSX.Element;
  as?: keyof JSX.HTMLElementTags | Component;
  class?: string;
};

export function Layout({
  children,
  as = "div",
  class: className,
}: LayoutProps) {
  return (
    <Dynamic component={as} class={className}>
      <Navbar />
      {children}
    </Dynamic>
  );
}
