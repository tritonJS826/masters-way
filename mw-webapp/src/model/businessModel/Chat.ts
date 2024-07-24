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

  constructor(chatData: ChatProps) {
    this.roomId = chatData.roomId;
    this.name = chatData.name;
    this.messages = chatData.messages;
    this.isBlocked = chatData.isBlocked;
    this.src = chatData.src;
  }

}