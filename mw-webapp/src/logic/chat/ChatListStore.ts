import {makeAutoObservable, runInAction} from "mobx";
import {ChatDAL, RoomType} from "src/dataAccessLogic/ChatDAL";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";

/**
 * All chatList-related methods
 */
export class ChatListStore {

  /**
   * Chat preview list
   */
  public chatPreviewList: ChatPreview[] = [];

  /**
   * Chat list  room type
   */
  public roomType: RoomType;

  /**
   * Chat list  loading state
   */
  public isLoadInProcessChatListPreview: boolean = false;

  /**
   * Group chat name
   */
  public groupChatName: string = "";

  constructor(roomType: RoomType) {
    makeAutoObservable(this);
    this.roomType = roomType;
    this.loadChatList();
  }

  /**
   * Set group chat name
   */
  /* Commented  method while groupChat is not realized on backend
  public setGroupChatName = (name: string) => {
    this.groupChatName = name;
  };
  */

  /**
   * Set room type
   */

  /* Commented  method while groupChat is not realized on backend
  public setRoomType = (chatRoomType: RoomType) => {
    this.chatRoomType = chatRoomType;
  };

 */

  /**
   * Load chat list
   */
  public loadChatList = async () => {
    this.isLoadInProcessChatListPreview = true;
    const chatsData = await ChatDAL.getRooms(this.roomType).finally(() => this.isLoadInProcessChatListPreview = false);
    runInAction(() => {
      this.chatPreviewList = chatsData.chatsPreview;
    });

  };

  /**
   * Add chat to chatList
   */
  public addChatToChatList = (chatPreview: ChatPreview) => {
    this.chatPreviewList.unshift(chatPreview);
  };

  /**
   * Increment unread messages counter in chatPreview
   */
  public incrementUnreadMessagesCounterInChatPreview = (roomId: string) => {
    const chatPreview = this.chatPreviewList.find(chat => chat.roomId === roomId);

    if (!chatPreview) {
      throw new Error("chat preview not found");
    }
    chatPreview.incrementUnreadMessagesAmount();
  };

}

