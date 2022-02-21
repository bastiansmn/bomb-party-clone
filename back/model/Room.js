import { RoomUUID } from "./common/RoomUUID.js";
import { BombParty } from "./BombParty.js";
import { RoomType } from "./common/RoomType.js";
import { Player } from "./Player.js";

// PUBLIC ROOM
export class Room {
  #roomID;
  #name;
  #players = [];

  #associatedGame;

  constructor(name) {
    this.#roomID = RoomUUID.generate();
    this.#name = name;
    this.start();
  }

  // METHODS  

  start() {
    setTimeout(() => {
      this.#players.forEach(player => {
        player.getSocket().send(JSON.stringify({
          message: "Game started",
        }))
      });
    }, 20_000);
  }

  getPlayer = (uuid) =>
    this.#players.find((player) => player.getUUID() == uuid);
  addPlayer = (connection, name) => {
    const player = new Player(connection, name);
    this.#players.push(player);
  };
  removePlayer = (uuid) => (this.#players = this.#players.filter((p) => p.getUUID() !== uuid));
  getPlayers = () => this.#players;
  getAdminPlayer = () => this.#players[0];
  
  // STATIC METHODS
  static exists = (roomID) =>
    BombParty.ROOMS.find((room) => room.getRoomID() === roomID);

  // GETTERS
  getName = () => this.#name;
  getType = () => RoomType.PUBLIC;
  getRoomID = () => this.#roomID;

  toString = () => `Room ${this.#roomID}: Name ${this.#name}`;
}

// PRIVATE ROOM

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
