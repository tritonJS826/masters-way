import {makeAutoObservable} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {load} from "src/hooks/useLoad";
import {Room} from "src/model/businessModel/Chat";

/**
 * All chat Room block-related methods
 */
export class ActiveRoomStore {

  /**
   * Active room  value
   *
   */
  public activeRoom!: Room;

  /**
   * Message's value
   */
  public message: string = "";

  constructor(roomId: string) {
    makeAutoObservable(this);
    this.initializeActiveRoom(roomId);

  }

  /**
   * Set message to send
   */
  public setMessage = (message: string) => {
    this.message = message;
  };

  /**
   * Load active room by roomId
   */
  private loadActiveRoom = async (roomId: string) => {
    const activeRoom = await ChatDAL.getRoomById(roomId);

    return activeRoom;
  };

  /**
   * Set active room
   */
  private setActiveRoom = (activeRoom: Room) => {
    this.activeRoom = activeRoom;

  };

  /**
   * Initialize active room
   */
  private async initializeActiveRoom(activeRoomId: string) {
    await load<Room>({

      /**
       * Load data
       */
      loadData: () => this.loadActiveRoom(activeRoomId),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setActiveRoom,
    });

  }

  /**
   * Validate data
   */
  private validateData = (data: Room) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}

