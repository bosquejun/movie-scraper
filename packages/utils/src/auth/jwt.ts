import { TAnyHash } from "@comeback/types";
import issuer, { Jwt, JwtPayload } from "jsonwebtoken";

export function issueJwt<T extends TAnyHash>(
	payload: T,
	secret: string,
	options?: issuer.SignOptions
) {
	const token = issuer.sign(payload, secret, {
		expiresIn: "30m",
		header: {
			alg: "ES256",
			typ: "JWT",
		},
		...options,
	});

	return token;
}

export function decodeJwt(jwt: string, secret: string): Jwt | null {
	const jwtPayload = issuer.decode(jwt, { complete: true, json: true });
	return jwtPayload;
}

export function verifyJwt<T extends JwtPayload>(
	jwt: string,
	secretOrPubkey: string
): T {
	return issuer.verify(jwt, secretOrPubkey) as T;
}
