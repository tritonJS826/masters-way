import {makeAutoObservable} from "mobx";
import {ChatUser} from "src/model/businessModel/ChatUser";
import {Message} from "src/model/businessModel/Message";

/**
 * Chat's props
 */
interface ChatProps {

  /**
   * Chat room's is blocked
   */
  isBlocked: boolean;

  /**
   * Chat room's massages
   */
  messages: Array<Message>;

  /**
   * Chat room's name
   */
  name: string;

  /**
   * Chat room UUID
   */
  roomId: string;

  /**
   * Chat room's image
   */
  imageUrl: string;

  /**
   * List of users in the chat
   */
  users: ChatUser[];

  /**
   * Room's type p2p or group
   */
  roomType: string;
}

/**
 * Chat model
 */
export class Chat {

  /**
   * Chat room's is blocked
   */
  public isBlocked: boolean;

  /**
   * Chat room's massages
   */
  public messages: Message[];

  /**
   * Chat room's name
   */
  public name: string;

  /**
   * Chat room UUID
   */
  public roomId: string;

  /**
   * Chat room's image
   */
  public imageUrl: string;

  /**
   * List of users in the chat
   */
  public users: ChatUser[];

  /**
   * Rooms' type p2p or group
   */
  public roomType: string;

  constructor(chatData: ChatProps) {
    makeAutoObservable(this);
    this.roomId = chatData.roomId;
    this.name = chatData.name;
    this.messages = chatData.messages;
    this.isBlocked = chatData.isBlocked;
    this.imageUrl = chatData.imageUrl;
    this.users = chatData.users;
    this.roomType = chatData.roomType;
  }

  /**
   * Add message to chat
   */
  public addMessage = (newMessage: Message) => {
    this.messages = [...this.messages, newMessage];
  };

}
