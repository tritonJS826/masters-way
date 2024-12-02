import {makeAutoObservable} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {ActiveChatStore} from "src/logic/chat/ChatRoomStore";

/**
 * All chat-related methods
 */
class ChatStore {

  /**
   * If true then chat window is open
   * @default false
   */
  public isChatOpen: boolean = false;

  /**
   * Amount of all unread messages
   */
  public unreadMessagesAmount: number = 0;

  /**
   * Room to active
   */
  public roomToActive: ActiveChatStore | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set chat open or close
   * @default false
   */
  public setIsChatOpen = (isChatOpen: boolean) => {
    this.isChatOpen = isChatOpen;
  };

  /**
   * Set room to active
   * @default false
   */
  public setRoomToActive = (roomToActive: ActiveChatStore | null) => {
    this.roomToActive = roomToActive;
  };

  /**
   * Load data
   */
  public loadUnreadMessagesAmount = async () => {
    const unreadMessages = await ChatDAL.getChatPreview();

    this.unreadMessagesAmount = unreadMessages;
  };

  /**
   * Add one unread message to amount
   */
  public addUnreadMessageToAmount = () => {
    this.unreadMessagesAmount++;
  };

}

export const chatStore = new ChatStore();
