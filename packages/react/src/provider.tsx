import { PropsWithChildren } from "react";
import ApiContext from "./context";

export type ComebackProviderProps = PropsWithChildren & {
	apiBaseUrl: string;
	version?: "v1";
	/**
	 * Using password-based access for now, but ideally to use API-Key for browser-platform integration
	 */
	auth: {
		email: string;
		password: string;
	};
};

export function ComebackApiProvider({
	children,
	apiBaseUrl,
	version,
	auth,
}: ComebackProviderProps) {
	const context: ApiContext = {
		apiBaseUrl,
		version: version || "v1",
		getApiBaseUrl() {
			return `${this.apiBaseUrl}/api/${this.version}`;
		},
		getClientCredentials() {
			return auth;
		},
	};
	return (
		<ApiContext.Provider value={context}>{children}</ApiContext.Provider>
	);
}
