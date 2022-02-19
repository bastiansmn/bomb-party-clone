import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import fastifyStatic from "fastify-static";
import path from "path";
import { randomUUID } from "crypto";

import { BombParty } from "./model/BombParty.js";

import { 
  root,
  createRoom
} from "./routes/routes.js";

import {
  createRoomParameters,
} from "./routes/schema.js";
import { Room } from "./model/Room.js";


const r1 = new Room('TEST3','PUBLIC' );
const r2 = new Room('TEST2','PUBLIC' );

const gameInstance = new BombParty();

// Middlewares
const fastify = Fastify({ logger: false });
fastify.register(FastifyWS);
fastify.register(fastifyStatic, {
  root: path.resolve("./public"),
});

const PREFIX = "/api/v1";

// Routes declaration
fastify.get("/", root);

fastify.post(PREFIX + "/createRoom", createRoomParameters, createRoom);

// Start the server
(async () => {
  try {
    await fastify.listen(4000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})();

