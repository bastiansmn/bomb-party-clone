import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import fastifyStatic from "fastify-static";
import path from "path";

import { BombParty } from "./model/BombParty.js";

import { 
  root, 
  createRoom, 
} from "./routes/routes.js";

import {
  Player
} from "./model/Player.js";

import { 
  createRoomParameters, 
} from "./routes/schema.js";
import { PrivateRoom, Room } from "./model/Room.js";


// Middlewares
export const fastify = Fastify({ logger: false });
fastify.register(FastifyWS);
fastify.register(fastifyStatic, {
  root: path.resolve("./public"),
});

// Routes declaration
fastify.get("/", root)

fastify.post("/room/createRoom", createRoomParameters, createRoom);

fastify.get("/room/fetch", async (_req, res) => {
  res.send({
    rooms: BombParty.ROOMS,
  })
})

fastify.get('/room/:roomID', { websocket: true }, async (connection, req) => {
  const { roomID } = req.params;
  let room = BombParty.findRoom(roomID);
  if (!room) {
    connection.socket.send(JSON.stringify({
      type: "error",
      message: "Room not found",
    }));
    return;
  }
  // TODO : Si pas déjà connecté, créer le joueur et l'ajouter à la room
  room.addPlayer(connection, req.query.username);
  connection.socket.send(JSON.stringify({
    type: "message",
    message: "Connected to room",
  }));
});

// Start the server
(async () => {
  try {
    await fastify.listen(4000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
})()
