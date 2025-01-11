import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {ChatListStore} from "src/logic/chat/ChatListStore";
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
   * Active room store
   */
  public activeChatStore: ActiveChatStore;

  /**
   * Active room store
   */
  public chatListStore: ChatListStore;

  constructor(chatListStore: ChatListStore, activeChatStore: ActiveChatStore) {
    makeAutoObservable(this);
    this.activeChatStore = activeChatStore;
    this.chatListStore = chatListStore;
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
    runInAction(() => {
      this.unreadMessagesAmount = unreadMessages;
    });

  };

  /**
   * Add one unread message to amount
   */
  public addUnreadMessageToAmount = () => {
    this.unreadMessagesAmount++;
  };

}

export const chatStore = new ChatStore(new ChatListStore, new ActiveChatStore);
