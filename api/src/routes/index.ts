import fastifyPlugin from "fastify-plugin";
import { TasksController } from "../controllers/TasksController";

async function routes(fastify, options) {
  fastify.get("/tasks", TasksController.index);

  fastify.get("/tasks/:id", TasksController.find);

  fastify.post("/tasks", TasksController.create);

  fastify.delete("/tasks", TasksController.delete);
}

export const Routes = fastifyPlugin(routes);
