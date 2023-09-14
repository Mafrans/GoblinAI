import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import svg from "vite-plugin-solid-svg";

export default defineConfig(async () => {
  return {
    plugins: [solid(), svg()],
  };
});
