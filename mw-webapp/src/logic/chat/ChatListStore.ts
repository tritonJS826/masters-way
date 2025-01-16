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
  public chatListPreview: ChatPreview[] = [];

  /**
   * Chat preview list
   */
  public chatRoomType: RoomType;

  /**
   * Group chat name
   */
  public groupChatName: string = "";

  constructor(chatRoomType: RoomType) {
    makeAutoObservable(this);
    this.chatRoomType = chatRoomType ?? RoomType.PRIVATE;
    this.loadChatList();
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
  public setRoomType = (chatRoomType: RoomType) => {
    this.chatRoomType = chatRoomType;
  };

  /**
   * Load chat list
   */
  public loadChatList = async () => {
    const fetchedChats = await ChatDAL.getRooms(this.chatRoomType);
    runInAction(() => {
      this.chatListPreview = fetchedChats.chatsPreview;
    });
  };

}

