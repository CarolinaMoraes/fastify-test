import { FromSchema } from "json-schema-to-ts";
export const markTaskTimeSchema = {
  type: "object",
  properties: {
    taskId: { type: "string" },
    taskTimeId: { type: "string" },
  },
  required: ["taskId", "taskTimeId"],
} as const;

export type MarkTaskTime = FromSchema<typeof markTaskTimeSchema>;
