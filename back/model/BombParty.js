import { RoomType } from "./common/RoomType.js";
import { Room, PrivateRoom } from "./Room.js";

export class BombParty {
  static ROOMS = [];
  
  static createRoom = (name, type, roomPasswd) => {
    const room = (type === RoomType.PUBLIC) ? new Room(name) : new PrivateRoom(name, roomPasswd)
    BombParty.ROOMS.push(room);
    return room;
  }
  
  static findRoom = (roomID) => BombParty.ROOMS.find(room => roomID == room.getRoomID());

}
