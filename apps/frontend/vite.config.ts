import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@comeback/ui": path.join(__dirname, "../../packages/ui/src"),
			"@comeback/react": path.join(__dirname, "../../packages/react/src"),
			"@comeback/schema": path.join(
				__dirname,
				"../../packages/schema/src"
			),
		},
	},
});
