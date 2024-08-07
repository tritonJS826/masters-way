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

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Load chat list
   */
  public loadChatList = async (isGroupChatOpen: boolean) => {
    const fetchedChats = isGroupChatOpen
      ? await ChatDAL.getRooms(RoomType.GROUP)
      : await ChatDAL.getRooms(RoomType.PRIVATE);

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
