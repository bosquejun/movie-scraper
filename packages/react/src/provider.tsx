import { PropsWithChildren, useEffect, useState } from "react";
import { toast } from "sonner";
import ApiContext from "./context";
import { useFetch } from "./hooks/useFetch";

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
	const fetch = useFetch(`${apiBaseUrl}/health`);
	const [init, setInit] = useState(true);

	useEffect(() => {
		if (init) {
			toast.loading("Connecting...", {
				closeButton: false,
				duration: Infinity,
			});
			setInit(false);
		}
		if (fetch.error) {
			toast.dismiss();
			toast.error(
				"Unable to connect. Check if the server is running then try again.",
				{
					duration: Infinity,
					closeButton: false,
					dismissible: false,
					action: (
						<button
							style={{
								color: "white",
								fontWeight: "bold",
								width: "10rem",
							}}
							onClick={() => {
								toast.dismiss();
								fetch.refetch();
							}}
						>
							Reconnect
						</button>
					),
				}
			);
		} else {
			toast.dismiss();
		}
	}, [fetch.loading]);

	function getContext(): ApiContext {
		return {
			apiBaseUrl,
			version: version || "v1",
			getApiBaseUrl() {
				return `${this.apiBaseUrl}/api/${this.version}`;
			},
			getClientCredentials() {
				return auth;
			},
			isHealthy: !fetch.loading && !fetch.error && fetch.data,
		};
	}

	return (
		<ApiContext.Provider value={getContext()}>
			{children}
		</ApiContext.Provider>
	);
}
