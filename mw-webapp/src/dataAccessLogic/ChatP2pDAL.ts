/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChatP2PService} from "src/service/ChatP2PService";

/**
 * Make message in p2p room params
 */
interface makeMessageInP2pRoomParams {

  /**
   * Room ID
   */
  rp2pRoomId: string;

  /**
   * Message value
   */
  message: string;

  /**
   * Room ID
   */
  roomId: string;

}

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

  /**
   * Get P2P chat room by ID
   */
  public static async getP2pRoomById(p2pRoomId: string): Promise<{ [key: string]: any }> {
    const p2pRoom = await ChatP2PService.getP2pRoomById({p2pRoomId});

    return p2pRoom;
  }

  /**
   * Get P2P chat rooms for user
   */
  public static async getP2pRooms(requestParameters: RequestInit): Promise<{ [key: string]: any }> {
    const p2pRooms = await ChatP2PService.getP2pRooms(requestParameters);

    return p2pRooms;
  }

  /**
   * Make message in P2P chat room
   */
  public static async makeMessageInP2pRoom(params: makeMessageInP2pRoomParams): Promise<{ [key: string]: any }> {
    const message = await ChatP2PService.makeMessageInP2pRoom({
      p2pRoomId: params.rp2pRoomId,
      request: {
        message: params.message,
        roomId: params.roomId,
      },
    });

    return message;
  }

  /**
   * Update P2P chat room
   */
  public static async updateP2pRoom(p2pRoomId: string): Promise<{ [key: string]: any }> {
    const p2pRoomUpdated = await ChatP2PService.updateP2pRoom({p2pRoomId});

    return p2pRoomUpdated;
  }

}
