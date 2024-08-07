import {makeAutoObservable} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {Chat} from "src/model/businessModel/Chat";

/**
 * All chatRoom block-related methods
 */
export class ChatRoomStore {

  /**
   * Active chat
   */
  public activeChat: Chat | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set active chat room
   */
  public setActiveChatRoom = (activeChat: Chat | null) => {
    this.activeChat = activeChat;
  };

  /**
   * Remove all active chat data
   */
  public clearActiveChat = () => {
    this.activeChat = null;
  };

  /**
   * Load data
   */
  public loadActiveChat = async (chatRoomUuid: string): Promise<Chat> => {
    const fetchedActiveChat = await ChatDAL.getRoomById(chatRoomUuid);

    return fetchedActiveChat;
  };

}

export const chatRoomStore = new ChatRoomStore();
