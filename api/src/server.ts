import "dotenv/config";
import { Connector } from "./database/connect";
import { Routes } from "./routes";

import cors from "@fastify/cors";

export const fastify = require("fastify")({
  logger: false,
});

fastify.register(cors);

fastify.register(Connector);
fastify.register(Routes);

fastify.listen({ port: 3000 }, (error) => {
  if (error) throw error;
  console.log(`server listening on ${fastify.server.address().port}`);
});
