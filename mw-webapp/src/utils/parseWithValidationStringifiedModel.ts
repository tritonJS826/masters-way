import {z} from "zod";

/**
 * Parse and validate json
 */
export const parseWithValidationStringifiedModel = <SchemaType extends z.ZodTypeAny>(rawData: string, schema: SchemaType) => {
  return z.custom<string>(() => {
    try {
      JSON.parse(rawData);
    } catch (error) {
      return false;
    }

    return true;
  }, "json can't be parsed")
    .transform((content) => JSON.parse(content))
    .pipe(schema)
    .parse(rawData);
};
