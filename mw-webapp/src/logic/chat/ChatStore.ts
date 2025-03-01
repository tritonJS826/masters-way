import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ActiveRoomStore} from "src/logic/chat/ActiveRoomStore";
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
   * ActiveRoomStore value
   */
  public activeRoomStore: ActiveRoomStore | null = null;

  /**
   * ChatListStore value
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
   * Initiate new activeChatStore
   */
  public initiateActiveRoomStore = (chatRoomId: string) => {
    this.activeRoomStore = new ActiveRoomStore(chatRoomId);
  };

  /**
   * Reset activeRoomStore
   */
  public resetActiveRoomStore = () => {
    this.activeRoomStore = null;
  };

  /**
   * Initiate new ChatListStore
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
   * Reset  chat stores
   */
  public resetChatStores = () => {
    this.resetActiveRoomStore();
    this.resetChatListStore();
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
   * Increase unread messages counter in chat trigger
   */
  public increaseUnreadMessagesCounterInChatTrigger = () => {
    this.unreadMessagesAmount++;
  };

}

export const chatStore = new ChatStore();
