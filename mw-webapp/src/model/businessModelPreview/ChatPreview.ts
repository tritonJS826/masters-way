/**
 * ChatPreview props
 */
interface ChatPreviewProps {

  /**
   * Chat room's is blocked
   */
  isBlocked: boolean;

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
  imageUrl: string | null;
}

/**
 * Chat preview model
 */
export class ChatPreview {

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
  public imageUrl: string | null;

  constructor(chatGroupData: ChatPreviewProps) {
    this.roomId = chatGroupData.roomId;
    this.name = chatGroupData.name;
    this.imageUrl = chatGroupData.imageUrl;
  }

}
