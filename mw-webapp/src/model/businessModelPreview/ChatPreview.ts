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

  /**
   * Participants users IDs
   */
  participantIds: string[];

  /**
   * Unread messages amount
   */
   unreadMessagesAmount: number;
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

  /**
   * Participants users IDs
   */
  public participantIds: string[];

  /**
   * Unread messages amount
   */
  public unreadMessagesAmount: number;

  constructor(chatGroupData: ChatPreviewProps) {
    this.roomId = chatGroupData.roomId;
    this.name = chatGroupData.name;
    this.imageUrl = chatGroupData.imageUrl;
    this.participantIds = chatGroupData.participantIds;
    this.unreadMessagesAmount = chatGroupData.unreadMessagesAmount;
  }

  /**
   * Increase unreadMessagesAmount value
   */
  public increaseUnreadMessagesAmount() {
    this.unreadMessagesAmount++;
  }

  /**
   * Reset unreadMessagesAmount value
   */
  public resetUnreadMessagesAmount() {
    this.unreadMessagesAmount = 0;
  }

}
