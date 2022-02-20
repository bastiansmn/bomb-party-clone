import { RoomUUID } from "./common/RoomUUID.js";
import { BombParty } from "./BombParty.js";
import { RoomType } from "./common/RoomType.js";

export class Room {
  #roomID;
  #name;
  #socket;
  
  constructor(name) {
    this.#roomID = RoomUUID.generate();
    this.#name = name;
  }

  // METHODS

  // STATIC METHODS
  static exists = (roomID) => BombParty.ROOMS.find((room) => room.getRoomID() === roomID);

  // GETTERS
  getName = () => this.#name;
  getType = () => RoomType.PUBLIC;
  getRoomID = () => this.#roomID;
  getSocket = () => this.#socket;
}

export class PrivateRoom extends Room {
  #passwd;

  constructor(name, passwd) {
    super(name);
    this.#passwd = passwd;
  }

  // METHODS
  matchPasswd = (passwd) => this.#passwd === passwd;

  getType = () => RoomType.PRIVATE;
}
