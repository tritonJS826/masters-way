/**
 * ChatP2P's props
 */
interface ChatP2pProps {

  /**
   * Chat p2p UUID
   */
  uuid: string;

  /**
   * Chat's user's name
   */
  userName: string;

  /**
   * Path to the user's image
   */
  src: string;

  /**
   * If true - user is online, is false user is offline
   */
  isUserActive: boolean;

  /**
   * Chat's created at date
   */
  createdAt: Date;

  /**
   * Chat's updated at date
   */
  updatedAt: Date;
}

/**
 * Chat p2p model
 */
export class ChatP2P {

  /**
   * Chat p2p UUID
   */
  public uuid: string;

  /**
   * Chat's user's name
   */
  public userName: string;

  /**
   * Path to the user's image
   */
  public src: string;

  /**
   * If true - user is online, is false user is offline
   */
  public isUserActive: boolean;

  /**
   * Chat's created at date
   */
  public createdAt: Date;

  /**
   * Chat's updated at date
   */
  public updatedAt: Date;

  constructor(chatP2PData: ChatP2pProps) {
    this.uuid = chatP2PData.uuid;
    this.userName = chatP2PData.userName;
    this.createdAt = chatP2PData.createdAt;
    this.updatedAt = chatP2PData.updatedAt;
    this.src = chatP2PData.src;
    this.isUserActive = chatP2PData.isUserActive;
  }

}
