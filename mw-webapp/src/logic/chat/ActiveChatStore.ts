import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {Room} from "src/model/businessModel/Chat";

/**
 * All chatRoom block-related methods
 */
export class ActiveChatStore {

  /**
   * Active chat
   *
   */
  public activeChat?: Room;

  /**
   * If true then active chat is hidden and only chat list is shown
   */
  public isChatHidden: boolean = true;

  /**
   * Message's value
   */
  public message: string = "";

  constructor(chatRoomId: string) {
    makeAutoObservable(this);
    this.initiateActiveChat(chatRoomId);
  }

  /**
   * Set is chat hidden on mobile
   */
  public setIsChatHiddenOnMobile = (isChatHiddenOnMobile: boolean) => {
    this.isChatHidden = isChatHiddenOnMobile;
  };

  /**
   * Set message to send
   */
  public setMessage = (message: string) => {
    this.message = message;
  };

  /**
   * Set new active chat
   */
  public setActiveChat = (chat: Room) => {
    this.activeChat = chat;
  };

  /**
   * Set message to send
   */
  public initiateActiveChat = async (chatRoomId: string) => {
    const activeChat = await ChatDAL.getRoomById(chatRoomId);
    runInAction(() => {
      this.activeChat = activeChat;
    });
  };

}

