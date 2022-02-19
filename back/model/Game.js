export class Game {
    #Session;
    #Start() {
      console.log("start");
    }
    constructor(session) {
      this.#Session = session;
    }
  }