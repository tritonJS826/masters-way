import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ActiveChatStore} from "src/logic/chat/ActiveChatStore";
import {ChatListStore} from "src/logic/chat/ChatListStore";

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
  public activeChatStore: ActiveChatStore | null = null;

  /**
   * Active room store
   */
  public chatListStore: ChatListStore | null = null;

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
   * Create new activeChatStore
   */
  public initiateActiveChatStore = (chatRoomId: string) => {
    this.activeChatStore = new ActiveChatStore(chatRoomId);
  };

  /**
   * Delete activeChatStore
   */
  public resetActiveChatStore = () => {
    this.activeChatStore = null;
  };

  /**
   * Create new ChatListStore
   */
  public initiateChatListStore = (chatRoomType: RoomType) => {
    this.chatListStore = new ChatListStore(chatRoomType);
  };

  /**
   * Reset chatListStore
   */
  public resetChatListStore = () => {
    this.chatListStore = null;
  };

  /**
   * Create new ChatListStore and  activeChatStore
   */
  public resetChatListStoreAndResetActiveChatStore = () => {
    this.chatListStore = null;
    this.activeChatStore = null;
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

export const chatStore = new ChatStore();
