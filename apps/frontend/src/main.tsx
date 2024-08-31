import { ComebackApiProvider } from "@comeback/react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<>
		<ComebackApiProvider
			apiBaseUrl={import.meta.env["VITE_API_BASE_URL"] || ""}
			auth={{
				email: import.meta.env["VITE_API_USER"] || "",
				password: import.meta.env["VITE_API_PASSWORD"] || "",
			}}
		>
			<App />
		</ComebackApiProvider>

		<Toaster
			theme='dark'
			toastOptions={{
				closeButton: true,
				classNames: {
					toast: "bg-black/50 backdrop-blur-md",
					error: "text-red-300",
					success: "text-green-300",
					warning: "text-yellow-300",
					info: "text-blue-300",
					closeButton: "bg-black/70 hover:bg-black/50",
				},
			}}
		/>
	</>
);
