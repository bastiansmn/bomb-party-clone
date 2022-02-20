import { RoomType } from "./common/RoomType.js";
import { Room, PrivateRoom } from "./Room.js";

export class BombParty {
  static ROOMS = [];
  #server
  constructor (server) {
    this.#server = server
  }

  static createRoom(name, type, roomPasswd) {
    const room = (type === RoomType.PUBLIC) ? new Room(name) : new PrivateRoom(name, roomPasswd)
    BombParty.ROOMS.push(room);
    return room;
  }

  //   constructor() {}
}
