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
   */
  public activeRoom: Room;

  /**
   * Message's value
   */
  public message: string = "";

  /**
   * If true then store data fully available
   */
  public isInitialized: boolean = false;

  constructor(roomId: string) {
    makeAutoObservable(this);
    // Create stub for active room
    this.activeRoom = new Room({
      roomId,
      isBlocked: true,
      messages: [],
      name: "",
      imageUrl: "",
      users: [],
      roomType: "private",
    });
    this.initializeActiveRoom(roomId);
  }

  /**
   * Set message to send
   */
  public setMessage = (message: string) => {
    this.message = message;
  };

  /**
   * Reload room
   */
  public reloadRoom = async (roomId: string) => {
    this.activeRoom.roomId = roomId;
    this.isInitialized = false;
    await this.initializeActiveRoom(roomId);
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
   * On success initialize active room
   */
  private onSuccess = (activeRoom: Room) => {
    this.setActiveRoom(activeRoom);
    this.isInitialized = true;
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
      onSuccess: this.onSuccess,
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

