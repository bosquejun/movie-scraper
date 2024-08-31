// Error class generator function
export function createAppError<TCode extends string>() {
	return class ErrorFactory extends Error {
		constructor(
			public readonly code: TCode,
			public readonly msg?: string
		) {
			super(msg);
		}

		isCode(code: TCode | TCode[]): boolean {
			return (typeof code === "string" ? [code] : code).includes(
				this.code
			);
		}
	};
}
