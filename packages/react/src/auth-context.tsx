import { UserRoles } from "@comeback/types";
import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { useAccessToken } from "./hooks";
import { useCheckToken } from "./hooks/useCheckToken";

type AuthContext = {
	token: string | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: string | null;
} & Pick<
	ReturnType<typeof useAccessToken>,
	"token" | "loading" | "fetchTokenAsync" | "fetchToken"
>;

export const AuthContext = createContext<AuthContext | null>(null);

function getAuthStorageKey(storageKey: string) {
	return `auth::token_${storageKey.split(" ").join("_")}`;
}

export function AuthProvider({
	children,
	storageKey,
	renderForm,
	checkRoles,
}: PropsWithChildren & {
	storageKey?: string;
	renderForm?: ReactNode;
	checkRoles?: UserRoles[];
}) {
	const {
		fetchTokenAsync,
		error,
		fetchToken,
		loading,
		token: loginToken,
	} = useAccessToken();
	const [state, setState] = useState<
		Omit<
			ReturnType<typeof useAccessToken>,
			"fetchToken" | "fetchTokenAsync"
		>
	>({
		token: null,
		loading: false,
		error: null,
	});
	const checkToken = useCheckToken(state.token);

	useEffect(() => {
		if (checkToken.loading || loginToken) return;
		let errorMessage = checkToken.error;
		let token = state.token;
		if (checkToken.jwtPayload && checkRoles) {
			const hasNoRole = !checkRoles.some((r) =>
				checkToken.jwtPayload?.roles.includes(r)
			);

			if (hasNoRole) {
				errorMessage = "User has no correct permission";
				token = null;
			}
		} else if (checkToken.error) {
			token = null;
		}

		if (errorMessage && storageKey) {
			window.localStorage.removeItem(getAuthStorageKey(storageKey));
		}

		setState((prev) => ({
			...prev,
			token,
			error: errorMessage,
		}));
	}, [checkToken.loading, state.token]);

	const isAuthenticated = Boolean(!checkToken.loading && state.token);

	useEffect(() => {
		if (loading || !loginToken) return;
		if (storageKey) {
			window.localStorage.setItem(
				getAuthStorageKey(storageKey),
				loginToken
			);
		}
		setState((prev) => ({
			...prev,
			token: loginToken,
			loading: false,
			error,
		}));
	}, [loading, loginToken]);

	useEffect(() => {
		if (storageKey) {
			const persistedToken =
				window.localStorage[getAuthStorageKey(storageKey)];

			setState((prev) => ({
				...prev,
				loading: false,
				token: persistedToken,
			}));
		}
	}, []);

	const context: AuthContext = {
		fetchTokenAsync,
		fetchToken,
		...state,
		isAuthenticated,
	};

	return (
		<AuthContext.Provider value={context}>
			{isAuthenticated ? children : renderForm}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within AuthProvider");
	}

	return context;
}
