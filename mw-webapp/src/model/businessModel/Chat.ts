import {makeObservable} from "mobx";
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
  src: string | null;

  /**
   * List of users in the chat
   */
  users: ChatUser[];
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
  public messages: Array<Message>;

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
  public src: string | null;

  /**
   * List of users in the chat
   */
  public users: ChatUser[];

  constructor(chatData: ChatProps) {
    makeObservable(this);
    this.roomId = chatData.roomId;
    this.name = chatData.name;
    this.messages = chatData.messages;
    this.isBlocked = chatData.isBlocked;
    this.src = chatData.src;
    this.users = chatData.users;
  }

  /**
   * Add message to chat
   */
  public addMessage = (newMessage: Message) => {
    this.messages = [...this.messages, newMessage];
  };

}
