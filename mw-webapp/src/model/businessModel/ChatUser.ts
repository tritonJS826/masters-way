/**
 * ChatUser's props
 */
interface ChatUserProps {

  /**
   * Chat user's role
   */
  role: string;

  /**
   * Chat user's UUID
   */
  userId: string;
}

/**
 * ChatUser model
 */
export class ChatUser {

  /**
   * Chat user's role
   */
  public role: string;

  /**
   * Chat user's UUID
   */
  public userId: string;

  constructor(chatUserData: ChatUserProps) {
    this.role = chatUserData.role;
    this.userId = chatUserData.userId;
  }

}
