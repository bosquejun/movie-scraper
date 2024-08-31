import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: +(process.env["NODE_PORT"] || 5173),
		proxy: {
			"/api": {
				target: "http://localhost:3001", // Proxy API requests to the backend service
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/api/, ""), // Optional: rewrite path
			},
		},
	},
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
