import {chatDTOToChat} from "src/dataAccessLogic/DTOToPreviewConverter/chatDTOToChat";
import {chatPreviewDTOToChatPreview} from "src/dataAccessLogic/DTOToPreviewConverter/chatPreviewDTOToChatPreview";
import {messageDTOToMessage} from "src/dataAccessLogic/DTOToPreviewConverter/messageDTOToMessage";
import {Chat} from "src/model/businessModel/Chat";
import {Message} from "src/model/businessModel/Message";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
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
 * All chat p2p params
 */
export interface AllChatParams {

  /**
   * Chats amount
   */
  size: number;

  /**
   * Array of chat preview
   */
  chatsPreview: ChatPreview[];
}

/**
 * Update chat p2p params
 */
export interface UpdateChatP2PParams {

  /**
   * Chat ID
   */
  p2pRoomId: string;

  /**
   * Chat blocked value
   */
  isBlocked?: boolean;
}

/**
 * Provides methods to interact with the p2p room
 */
export class ChatP2pDAL {

  /**
   * Create p2p room
   */
  public static async createP2pRoom(userId: string): Promise<Chat> {
    const p2pRoomDTO = await ChatP2PService.createP2pRoom({request: {userId}});
    const p2pRoom = chatDTOToChat(p2pRoomDTO);

    return p2pRoom;
  }

  /**
   * Get P2P chat room by ID
   */
  public static async getP2pRoomById(p2pRoomId: string): Promise<Chat> {
    const p2pRoomDTO = await ChatP2PService.getP2pRoomById({p2pRoomId});
    const p2pRoom = chatDTOToChat(p2pRoomDTO);

    return p2pRoom;
  }

  /**
   * Get P2P chat rooms for user
   */
  public static async getP2pRooms(requestParameters: RequestInit): Promise<AllChatParams> {
    const p2pRoomsDTO = await ChatP2PService.getP2pRooms(requestParameters);
    const chatsPreview = p2pRoomsDTO.rooms.map(chatPreviewDTOToChatPreview);

    const p2pRooms = {
      size: p2pRoomsDTO.size,
      chatsPreview,
    };

    return p2pRooms;
  }

  /**
   * Make message in P2P chat room
   */
  public static async makeMessageInP2pRoom(params: makeMessageInP2pRoomParams): Promise<Message> {
    const messageDTO = await ChatP2PService.makeMessageInP2pRoom({
      p2pRoomId: params.rp2pRoomId,
      request: {
        message: params.message,
        roomId: params.roomId,
      },
    });
    const message = messageDTOToMessage(messageDTO);

    return message;
  }

  /**
   * Update P2P chat room
   */
  public static async updateP2pRoom(params: UpdateChatP2PParams): Promise<Chat> {
    const p2pRoomUpdatedDTO = await ChatP2PService.updateP2pRoom({
      p2pRoomId: params.p2pRoomId,
      request: {isBlocked: params.isBlocked ?? null},
    });
    const p2pRoomUpdated = chatDTOToChat(p2pRoomUpdatedDTO);

    return p2pRoomUpdated;
  }

}
