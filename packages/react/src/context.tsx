import { createContext, useContext } from "react";
import { ComebackProviderProps } from "./provider";

type ApiContext = {
	apiBaseUrl: string;
	version: "v1";
	getApiBaseUrl: () => string;
	getClientCredentials: () => ComebackProviderProps["auth"];
};

const ApiContext = createContext<ApiContext | null>(null);

export function useComebackApi() {
	const context = useContext(ApiContext);
	if (!context) {
		throw new Error(
			"useComebackApi must be used within ComebackApiProvider"
		);
	}

	return context;
}

export default ApiContext;
