/**
 * Base socket event
 */
export class BaseSocketEvent {

  /**
   * Event name. Format:  microservice:event-name
   * Example: "mw-chat-websocket:message-received"
   */
  public type: string;

  /**
   * Event payload
   */
  public payload: object;

  constructor(params: BaseSocketEvent) {
    this.type = params.type;
    this.payload = params.payload;
  }

}
