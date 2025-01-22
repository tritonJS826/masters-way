import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {Room} from "src/model/businessModel/Chat";

/**
 * All chat Room block-related methods
 */
export class ActiveRoomStore {

  /**
   * Default chat active room  value
   *
   */
  public activeRoom: Room | null = null;

  /**
   *Active room id  value
   *
   */
  public activeRoomId: string;

  /**
   * Message's value
   */
  public message: string = "";

  constructor(roomId: string) {
    makeAutoObservable(this);
    this.loadActiveRoom(roomId);
    this.activeRoomId = roomId;
  }

  /**
   * Set message to send
   */
  public setMessage = (message: string) => {
    this.message = message;
  };

  /**
   * Load active room by RoomId
   */
  private loadActiveRoom = async (roomId: string) => {
    const activeRoom = await ChatDAL.getRoomById(roomId);
    runInAction(() => {
      this.activeRoom = activeRoom;
    });
  };

}

