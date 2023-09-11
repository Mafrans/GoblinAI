import { tunnelmole } from "tunnelmole";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

const port = 5173;

export default defineConfig(({ command }) => {
  if (command === "serve") {
    tunnelmole({ port }).then((url) => {
      console.clear();
      console.log(`GoblinAI running on ${url}`);
    });
  }

  return {
    server: {
      port,
    },
    plugins: [solid()],
  };
});
