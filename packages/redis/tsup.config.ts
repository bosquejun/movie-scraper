import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src/index.ts"],
	noExternal: ["@comeback"],
	splitting: false,
	bundle: true,
	outDir: "./dist",
	clean: true,
	env: { IS_SERVER_BUILD: "true" },
	loader: { ".json": "copy" },
	minify: true,
	sourcemap: true,
});
