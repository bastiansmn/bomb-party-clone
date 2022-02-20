export class Game {
  #onlinePlayers = [];
  static #MAX_PLAYERS = 10;
  static #MIN_PLAYERS = 2;
  constructor() {}

  addPlayer = (uuid) => this.#onlinePlayers.push(uuid)
}
