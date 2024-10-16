import { CreateTask } from "./createTask.schema";
import { TaskService } from "./task.service";
import { createTaskSchema } from "./createTask.schema";
import { RequestContext } from "@mikro-orm/core";
import { FastifyInstance } from "fastify";
import { MarkTaskTime, markTaskTimeSchema } from "./markTaskTime.schema";
import { parse } from "date-fns";

export async function taskRoutes(fastify: FastifyInstance) {
  const taskService = new TaskService();

  fastify.post<{ Body: CreateTask }>(
    "/",
    {
      schema: {
        body: createTaskSchema,
      },
    },
    async (req, reply) => {
      return taskService.createTask(
        req.body,
      );
    }
  );

  fastify.post<{ Body: MarkTaskTime }>(
    "/complete",
    {
      schema: {
        body: markTaskTimeSchema,
      },
    },
    async (req, reply) => {
      return taskService.markAsCompleted(
        req.body,
      );
    }
  );

  fastify.get("/by-date/:date", async (req, reply) => {
    const { date } = req.params as { date: string };

    const formatString = "yyyy-MM-dd";
    const parsedDate = parse(date, formatString, new Date());

    return taskService.getTasksOfDate(
      parsedDate,
    );
  });
}
