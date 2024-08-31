export type TAnyHash = Record<string, any>;
export type TStringHash = Record<string, string>;

export type NodeEnvironment = "production" | "development" | "local";
export type LogLevel = "debug" | "warn" | "info" | "error";

export enum UserRoles {
	ADMIN = "admin",
	SYSTEM = "system",
	USER = "user",
}
