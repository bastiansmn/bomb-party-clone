import { RoomType } from "../model/common/RoomType.js";

// Main route
export const root = async (_req, res) => {
  res.send({
    message: "Welcome to the API",
  });
};

export const createRoom = async (req, res) => {
  const { roomName, roomType, roomPasswd } = req.body;
  
  // TODO : Créer la room, l'ajouter à la liste des rooms, et renvoyer l'uuid de la room créée

  res.status(200).send({
    message: "Room created",
  });
};




