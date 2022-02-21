import { randomUUID } from "crypto";

export class Player {
   #name;
   #uuid;
   #letters = [..."abcdefghijklmnopqrstuvwxyz"];
   #connection;

   constructor(connection, name) {
      this.#connection = connection
      this.#name = name ? name : Player.randomName()
      this.#uuid = randomUUID()
   }
   
   //METHODS
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
      ]
      const animals = [
         "Lion",
         "Tigre",
         "Elephant",
         "Giraffe",
         "Hippopothame",
         "Singe",
         "Panda",
         "Pinguoin",
         "Ours",
         "Lapin",
         "Mouton",
         "Serpent",
         "Tortue",
         "Loup"
      ]
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
      ]
      return `${animals[Math.floor(Math.random() * animals.length)]} ²${superheroes[Math.floor(Math.random() * superheroes.length)]} ${colors[Math.floor(Math.random() * colors.length)]}`
   }

   getConnection = () => this.#connection;
   getSocket = () => this.#connection.socket;
   getName = () => this.#name;
   getUUID = () => this.#uuid;
}