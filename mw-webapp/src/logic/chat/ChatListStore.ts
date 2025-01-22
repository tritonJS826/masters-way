import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";

/**
 * All chatList-related methods
 */
export class ChatListStore {

  /**
   * Chat preview list
   */
  public chatList: ChatPreview[] = [];

  /**
   * Chat preview list
   */
  public roomType: RoomType;

  /**
   * Group chat name
   */
  public groupChatName: string = "";

  constructor(chatRoomType: RoomType) {
    makeAutoObservable(this);
    this.roomType = chatRoomType ?? RoomType.PRIVATE;
    this.loadChatList();
  }

  /**
   * Set room type
   */
  /* Commented  method while groupChat is not realized on backend
  public setGroupChatName = (name: string) => {
    this.groupChatName = name;
  };
  */

  /**
   * Set room type
   */

  /* Commented  method while groupChat is not realized on backend
  public setRoomType = (chatRoomType: RoomType) => {
    this.chatRoomType = chatRoomType;
  };
 */
  /**
   * Load chat list
   */
  public loadChatList = async () => {
    const fetchedChats = await ChatDAL.getRooms(this.roomType);
    runInAction(() => {
      this.chatList = fetchedChats.chatsPreview;
    });
  };

}

