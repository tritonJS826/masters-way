import {Message} from "src/model/businessModel/Message";

/**
 * ChatPreview props
 */
interface ChatPreviewProps {

  /**
   * Chat room's is blocked
   */
  isBlocked: boolean;

  /**
   * LastMessage in the chat
   */
  lastMessage: Message;

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
 * Chat preview model
 */
export class ChatPreview {

  /**
   * LastMessage in the chat
   */
  public lastMessage: Message;

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

  constructor(chatGroupData: ChatPreviewProps) {
    this.roomId = chatGroupData.roomId;
    this.name = chatGroupData.name;
    this.lastMessage = chatGroupData.lastMessage;
    this.src = chatGroupData.src;
  }

}
