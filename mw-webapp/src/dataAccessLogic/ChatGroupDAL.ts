/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChatGroupService} from "src/service/ChatGroupService";

/**
 * Provides methods to interact with the group room
 */
export class ChatGroupDAL {

  /**
   * Create group room
   */
  public static async createGroupRoom(params: RequestInit): Promise<any> {
    const groupRoomDTO = await ChatGroupService.createGroupRoom(params);

    return groupRoomDTO;
  }

}
