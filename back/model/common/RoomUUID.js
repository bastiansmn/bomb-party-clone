import { Room } from "../Room.js";

export class RoomUUID {
  static #MAX_LEN = 6;

  static generate() {
    let letters = "";
    let summ = 0;
    let i;
    for (i = 0; i < RoomUUID.#MAX_LEN - 1; i++) {
      letters += RoomUUID.getRandomLetter();
      summ += letters.charCodeAt(i) - 64;
    }
    letters += String.fromCharCode((summ % 26) + 65);

    if (Room.exists(letters)) return RoomUUID.generate();
    return letters;
  }

  static isValid(id) {
    if (typeof id !== "string") return false;
    if (id.length !== RoomUUID.#MAX_LEN) return false;
    let summ = 0;
    for (let i = 0; i < RoomUUID.#MAX_LEN - 1; i++) {
      summ += id.charCodeAt(i) - 64;
    }
    if (id[RoomUUID.#MAX_LEN - 1] !== String.fromCharCode((summ % 26) + 65))
      return false;
    return true;
  }

  static getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
  }
}
