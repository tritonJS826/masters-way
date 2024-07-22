import {Message} from "src/model/businessModel/Message";

/**
 * ChatGroup's props
 */
interface ChatGroupProps {

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
 * Chat group model
 */
export class ChatGroup {

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

  constructor(chatGroupData: ChatGroupProps) {
    this.roomId = chatGroupData.roomId;
    this.name = chatGroupData.name;
    this.messages = chatGroupData.messages;
    this.isBlocked = chatGroupData.isBlocked;
    this.src = chatGroupData.src;
  }

}
