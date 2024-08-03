/**
 * Base socket event
 */
export class BaseSocketEvent {

  /**
   * Event name. Format:  microservice:event-name
   * Example: "mw-chat-websocket:message-received"
   */
  public name: string;

  /**
   * Event payload
   */
  public payload: object;

  constructor(params: BaseSocketEvent) {
    this.name = params.name;
    this.payload = params.payload;
  }

}
