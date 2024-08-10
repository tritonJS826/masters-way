import {makeAutoObservable} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";

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
   * Load data
   */
  public loadUnreadMessagesAmount = async () => {
    const unreadMessages = await ChatDAL.getChatPreview();

    this.unreadMessagesAmount = unreadMessages;
  };

}

export const chatStore = new ChatStore();
