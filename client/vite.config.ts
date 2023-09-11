import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig(async () => {
  return {
    plugins: [solid()],
  };
});
