import { TAnyHash } from "@comeback/types";
import { TSchema } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = addFormats(new Ajv({}), [
	"date-time",
	"time",
	"date",
	"email",
	"hostname",
	"ipv4",
	"ipv6",
	"uri",
	"uri-reference",
	"uuid",
	"uri-template",
	"json-pointer",
	"relative-json-pointer",
	"regex",
]);

export const validateSchemaResponse = <T extends TAnyHash>(
	schema: TSchema,
	data: T
) => {
	const validator = TypeCompiler.Compile(schema);

	const isValid = validator.Check(data);
	return {
		isValid,
		errors: isValid ? null : [...validator.Errors(data)],
	};
};

export function checkDataSchemaErrors<
	T extends TAnyHash | TAnyHash[] | undefined,
>(schema: TSchema, data: T) {
	const validate = ajv.compile(schema);

	validate(data);

	return validate.errors;

	// const valid = validate(data);
	// if (valid) {
	// 	return;
	// } else {
	// 	console.error("Data is invalid:", validate.errors);
	// 	return validate.errors;
	// }
}
