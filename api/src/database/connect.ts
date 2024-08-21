import fastifyMysql from "@fastify/mysql";
import fastifyPlugin from "fastify-plugin";

async function dbConnector(fastify, options) {
  fastify.register(fastifyMysql, {
    promise: true,
    connectionString: process.env.MYSQL_URI,
  });
}

export const Connector = fastifyPlugin(dbConnector);
