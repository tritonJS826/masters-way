import {makeAutoObservable} from "mobx";

/**
 * All chat-related methods
 */
class ChatStore {

  /**
   * If true then chat window is open
   * @default false
   */
  public isChatOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Set theme
   */
  public setIsChatOpen = (isChatOpen: boolean) => {
    this.isChatOpen = isChatOpen;
  };

}

export const chatStore = new ChatStore();
