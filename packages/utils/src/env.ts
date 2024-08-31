export function getEnv<T extends string>(
	envName: string,
	defaultValue = ""
): T {
	return (process.env[envName] || defaultValue) as T;
}
