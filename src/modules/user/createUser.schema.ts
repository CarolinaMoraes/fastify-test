import { FromSchema } from "json-schema-to-ts";
export const createUserSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    times: { type: "array", minLength: 1, items: { type: "string" } },
  },
  required: ["email", "times"],
} as const;

export type CreateUser = FromSchema<typeof createUserSchema>;
