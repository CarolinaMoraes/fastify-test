import { FromSchema } from "json-schema-to-ts";
import { RecurrencyType } from "./task.entity";
export const createTaskSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    recurrencyType: {
      type: "string",
      enum: Object.values(RecurrencyType),
    },
    scheduledTimesPerDay: {
      type: "array",
      items: { type: "string", format: "time" },
    },
    startDate: { type: "string", format: "date-time" },
    endDate: { type: "string", format: "date-time" },
  },
  required: ["name", "startDate", "recurrencyType", "scheduledTimesPerDay"],
} as const;

export type CreateTask = FromSchema<typeof createTaskSchema>;
