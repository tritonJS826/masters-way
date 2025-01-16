import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL} from "src/dataAccessLogic/ChatDAL";
import {ChatRoom} from "src/model/businessModel/Chat";

/**
 * All chatRoom block-related methods
 */
export class ActiveChatStore {

  /**
   * Default Active chat room  value
   *
   */
  public activeChatRoom: ChatRoom | null = null;

  /**
   *Active chat room id  value
   *
   */
  public activeChatRoomId: string;

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
    this.loadActiveChat(chatRoomId);
    this.activeChatRoomId = chatRoomId;
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
   * Set message to send
   */
  public getActiveChatRoomId = () => {
    return this.activeChatRoomId;
  };

  /**
   * Load active chat by chatRoomId
   */
  private loadActiveChat = async (chatRoomId: string) => {
    const fetchedActiveChatRoom = await ChatDAL.getRoomById(chatRoomId);
    runInAction(() => {
      this.activeChatRoom = fetchedActiveChatRoom;
    });
  };

}

