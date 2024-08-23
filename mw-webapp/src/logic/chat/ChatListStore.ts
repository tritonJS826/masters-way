import {makeAutoObservable} from "mobx";
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

  constructor(roomType?: RoomType) {
    makeAutoObservable(this);
    this.roomType = roomType ?? RoomType.PRIVATE;
  }

  /**
   * Set room type
   */
  public setGroupChatName = (name: string) => {
    this.groupChatName = name;
  };

  /**
   * Set room type
   */
  public setRoomType = (roomType: RoomType) => {
    this.roomType = roomType;
  };

  /**
   * Load chat list
   */
  public loadChatList = async () => {
    const fetchedChats = await ChatDAL.getRooms(this.roomType);

    this.chatList = fetchedChats.chatsPreview;
  };

  /**
   * Add chat to chat list
   */
  public addChatToChatList = (chatPreview: ChatPreview) => {
    this.chatList.push(chatPreview);
  };

}

export const chatListStore = new ChatListStore();
