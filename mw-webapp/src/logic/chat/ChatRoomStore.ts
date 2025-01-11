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
  public activeChat: Room | null = null;

  /**
   * If true then active chat is hidden and only chat list is shown
   */
  public isChatHidden: boolean = true;

  /**
   * Message's value
   */
  public message: string = "";

  constructor() {
    makeAutoObservable(this);
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
  public initiateActiveChat = async (roomId: string) => {
    const activeChat = await ChatDAL.getRoomById(roomId);
    runInAction(() => {
      this.activeChat = activeChat;
    });

  };

  /**
   * Clear active chat
   */
  public clearActiveChat = () => {
    this.activeChat = null;
  };

}

