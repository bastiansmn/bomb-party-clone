import { RoomType } from "../model/common/RoomType.js";
import { BombParty } from "../model/BombParty.js";
import { Player } from "../model/Player.js";

// Main route
export const root = async (_req, res) => {
  res.send({
    message: "Welcome to the API",
  });
};

export const createRoom = async (req, res) => {
  const { roomName, roomType, roomPasswd } = req.body;
  if (roomType === RoomType.PRIVATE && !roomPasswd) {
    res.status(400).send({
      message: "Private room must have a password",
    });
  }
  const room = BombParty.createRoom(roomName, roomType, roomPasswd);
  res.status(200).send({
    message: "Room created",
    room: {
      roomID: room.getRoomID(),
      roomName: room.getName(),
      roomType: room.getType(),
    }
  });
};

export const createUser = async (req, res) => {
  let { name } = req.body;
  return new Player(name);
};
