import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const Keys = ["API_ENDPOINT"];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};

  Keys.forEach((key) => (processEnv[key] = env[key]));

  return {
    define: {
      "process.env": processEnv,
    },
    plugins: [react()],
  };
});
