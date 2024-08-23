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

  constructor(chatGroupData: ChatPreviewProps) {
    this.roomId = chatGroupData.roomId;
    this.name = chatGroupData.name;
    this.imageUrl = chatGroupData.imageUrl;
    this.participantIds = chatGroupData.participantIds;
  }

}
