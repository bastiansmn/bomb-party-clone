import { randomUUID } from "crypto";
import { PlayerStatus } from "./common/PlayerStatus.js";

export class Player {
  #name;
  #uuid;
  #letters = [..."abcdefghijklmnopqrstuvwxyz"];
  #connection;
  #status = PlayerStatus.ONLINE;
  constructor(connection, name) {
    this.#connection = connection;
    this.#name = name ? name : Player.randomName();
    this.#uuid = randomUUID();
    this.onDisconnect();
    this.onSendMessage()
  }

  // EVENTS 
  onDisconnect = () => this.getSocket().on("close", () => this.changeStatus());  

  onSendMessage = () => this.getSocket().on('message', async (message) => console.log("message") )
  
  //METHODS
  changeStatus = () => (this.#status = (this.#status === PlayerStatus.ONLINE) ? PlayerStatus.OFFLINE : PlayerStatus.ONLINE)
  
  static randomName = () => {
    const superheroes = [
      "Superman",
      "Batman",
      "Spiderman",
      "WonderWoman",
      "Flash",
      "GreenLantern",
      "CaptainAmerica",
      "IronMan",
      "Thor",
      "Hulk",
      "BlackWidow",
      "Hawkeye",
      "BlackPanther",
    ];
    const animals = [
      "Lion",
      "Tigre",
      "Elephant",
      "Giraffe",
      "Hippopothame",
      "Singe",
      "Panda",
      "Pingouin",
      "Ours",
      "Lapin",
      "Mouton",
      "Serpent",
      "Tortue",
      "Loup",
    ];
    const colors = [
      "Bleu",
      "Rouge",
      "Vert",
      "Jaune",
      "Orange",
      "Violet",
      "Rose",
      "Marron",
      "Noir",
      "Blanc",
    ];
    return `${animals[Math.floor(Math.random() * animals.length)]} ${
      superheroes[Math.floor(Math.random() * superheroes.length)]
    } ${colors[Math.floor(Math.random() * colors.length)]}`;
  };
  // GETTERS
  getConnection = () => this.#connection;
  getSocket = () => this.#connection.socket;
  getName = () => this.#name;
  getUUID = () => this.#uuid;
  getStatus = () => this.#status

  // SETTERS
  setConnection = (connection) => this.#connection = connection
}
