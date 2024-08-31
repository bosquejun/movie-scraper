import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/**/*.{ts,tsx}"],
	noExternal: ["@comeback/express-lib"],
	external: ["@comeback/express-lib"],
	splitting: false,
	bundle: true,
	outDir: "./dist",
	clean: true,
	env: { IS_SERVER_BUILD: "true" },
	loader: { ".json": "copy" },
	minify: true,
	target: "esnext",
	format: ["cjs"],
	sourcemap: true,
});
