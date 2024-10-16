import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { taskRoutes } from '../../modules/task/task.routes'
import { userRoutes } from '../../modules/user/user.routes

async function registerRoutes(fastify: FastifyInstance) {
  fastify.register(taskRoutes, { prefix: '/tasks' })
  fastify.register(userRoutes, { prefix: '/users' })
}

export default fastifyPlugin(registerRoutes)
