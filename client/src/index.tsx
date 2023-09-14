/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

import "./index.css";
import App from "./App";
import dayjs from "dayjs";

dayjs.extend(relativeTimePlugin);

const root = document.getElementById("root");

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  root!
);
