import { randomUUID } from "crypto";

export class Room {
  // TODO : refactor en clé
  #uuid;
  #name;
  #type;

  constructor(name, type) {
    this.#uuid = randomUUID();
    this.#name = name;
    this.#type = type;
  }

  static exists(uuid) {
    return BombParty.ROOMS.find((room) => room.getUUID() === uuid);
  }

  // GETTERS
  getName = () => this.#name;
  getType = () => this.#type;
  getUUID = () => this.#uuid;
}
