import {makeAutoObservable} from "mobx";

/**
 * Message's reader model
 */
export class MessageReader {

  /**
   * Message's reader UUID
   */
  public userId: string;

  /**
   * Message's reader image url
   */
  public ownerImageUrl: string;

  /**
   * Message's reader name
   */
  public ownerName: string;

  /**
   * Date when message was read
   */
  public readDate: Date;

  constructor(messageReaderData: MessageReader) {
    makeAutoObservable(this);
    this.userId = messageReaderData.userId;
    this.ownerImageUrl = messageReaderData.ownerImageUrl;
    this.ownerName = messageReaderData.ownerName;
    this.readDate = messageReaderData.readDate;
  }

}

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

  /**
   * Owner's image url
   */
  public ownerImageUrl: string;

  /**
   * Message's owner name
   */
  public ownerName: string;

  /**
   * Message's readers
   */
  public messageReaders: MessageReader[];

  constructor(messageData: Message) {
    makeAutoObservable(this);
    this.message = messageData.message;
    this.ownerId = messageData.ownerId;
    this.ownerImageUrl = messageData.ownerImageUrl;
    this.ownerName = messageData.ownerName;
    this.messageReaders = messageData.messageReaders;
  }

}
