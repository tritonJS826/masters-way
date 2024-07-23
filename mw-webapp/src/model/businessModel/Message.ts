/**
 * Message model
 */
export class Message {

  /**
   * Message's value
   */
  public message: string;

  /**
   * Message's owner UUID
   */
  public ownerId: string;

  constructor(messageData: Message) {
    this.message = messageData.message;
    this.ownerId = messageData.ownerId;
  }

}
