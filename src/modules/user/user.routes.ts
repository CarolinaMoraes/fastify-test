import { FastifyInstance } from "fastify";
import { CreateUser, createUserSchema } from "./createUser.schema";
import { UserService } from "./user.service";

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService();

  fastify.post<{ Body: CreateUser }>(
    "/",
    {
      schema: {
        body: createUserSchema,
      },
    },
    async (req, reply) => {
      return userService.createUser(
        req.body,
      );
    }
  );
}
