/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import relativeTimePlugin from "dayjs/plugin/relativeTime";
import "@fontsource-variable/inter";
import "@fontsource-variable/fira-code";

import "./index.css";
import App from "./App";
import dayjs from "dayjs";

dayjs.extend(relativeTimePlugin);

const root = document.getElementById("root");

if (import.meta.env.DEV && !document.title.includes("(DEV)")) {
  document.title += " (DEV)";
}

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
