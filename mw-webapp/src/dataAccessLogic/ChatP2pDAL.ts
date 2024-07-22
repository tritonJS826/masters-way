/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChatP2PService} from "src/service/ChatP2PService";

/**
 * Provides methods to interact with the p2p room
 */
export class ChatP2pDAL {

  /**
   * Create p2p room
   */
  public static async createP2pRoom(params: RequestInit): Promise<any> {
    const p2pRoomDTO = await ChatP2PService.createP2pRoom(params);

    return p2pRoomDTO;
  }

}
