import bcrypt from "bcryptjs";

const saltRounds = 10; // The higher the number, the more secure but slower the hashing

export async function hashPassword(password: string) {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
	return bcrypt.compare(password, hashedPassword);
}
