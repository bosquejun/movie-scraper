import { UserRoles } from "@comeback/types";
import { Static, Type } from "@sinclair/typebox";
import { BaseEntitySchema } from "../common";
import { createResponseSchemaObject } from "../express";

export const UserSchema = Type.Intersect([
	BaseEntitySchema,
	Type.Object({
		email: Type.String({ format: "email" }),
		password: Type.String(),
	}),
]);

export type UserSchema = Static<typeof UserSchema>;

export const AdminCreateUserSchema = Type.Intersect([
	Type.Pick(UserSchema, ["email", "password"]),
	Type.Object({
		roles: Type.Array(Type.Enum(UserRoles)),
	}),
]);

export type AdminCreateUserSchema = Static<typeof AdminCreateUserSchema>;

export const UserRegisterSchema = Type.Omit(AdminCreateUserSchema, ["roles"]);

export type UserRegisterSchema = Static<typeof UserRegisterSchema>;

/**
 * use register schema for now
 */
export const UserLoginSchema = UserRegisterSchema;

export type UserLoginSchema = Static<typeof UserLoginSchema>;

export const UserLoginResponseSchema = Type.Object({
	token: Type.String(),
});

export type UserLoginResponseSchema = Static<typeof UserLoginResponseSchema>;

export const UserLoginAPIResponseSchema = createResponseSchemaObject(
	UserLoginResponseSchema
);

export type UserLoginAPIResponseSchema = Static<
	typeof UserLoginAPIResponseSchema
>;

export const UserRegisterResponseSchema = Type.Omit(UserSchema, ["password"]);

export type UserRegisterResponseSchema = Static<
	typeof UserRegisterResponseSchema
>;

export const UserRegisterAPIResponseSchema = createResponseSchemaObject(
	UserRegisterResponseSchema
);

export type UserRegisterAPIResponseSchema = Static<
	typeof UserRegisterAPIResponseSchema
>;

export const AuthJwtPayload = Type.Object({
	roles: Type.Array(Type.Enum(UserRoles)),
	iat: Type.Number(),
	exp: Type.Number(),
	iss: Type.String(),
	sub: Type.String(),
	jti: Type.String({ format: "uuid" }),
});

export type AuthJwtPayload = Static<typeof AuthJwtPayload>;

export const AuthJwtPayloadAPIResponse =
	createResponseSchemaObject(AuthJwtPayload);

export type AuthJwtPayloadAPIResponse = Static<
	typeof AuthJwtPayloadAPIResponse
>;
