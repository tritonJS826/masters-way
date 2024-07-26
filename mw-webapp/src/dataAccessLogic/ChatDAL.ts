import {chatDTOToChat} from "src/dataAccessLogic/DTOToPreviewConverter/chatDTOToChat";
import {chatPreviewDTOToChatPreview} from "src/dataAccessLogic/DTOToPreviewConverter/chatPreviewDTOToChatPreview";
import {messageDTOToMessage} from "src/dataAccessLogic/DTOToPreviewConverter/messageDTOToMessage";
import {Chat} from "src/model/businessModel/Chat";
import {Message} from "src/model/businessModel/Message";
import {ChatPreview} from "src/model/businessModelPreview/ChatPreview";
import {ChatService} from "src/service/ChatService";

/**
 * Room type
 */
export enum RoomType {

  /**
   * Person to person chat
   */
  PRIVATE = "private",

  /**
   * Group chat
   */
  GROUP = "group"
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
 * Params for manage users in the room {@link ChatDAL.addUserToRoom} and {@link ChatDAL.deleteUserFromRoom}
 */
interface RoomUserManageParams {

  /**
   * Chat ID
   */
  roomId: string;

  /**
   * USer ID
   */
  userId: string;
}

/**
 * Create message in group chat params
 */
export interface createMessageInGroupParams {

  /**
   * Message's value
   */
  message: string;

  /**
   * Group chat ID
   */
  roomId: string;
}

/**
 * Create room params
 */
interface CreateRoomParams {

  /**
   * Room's name
   */
  name?: string;

  /**
   * Room's type
   */
  roomType: string;

  /**
   * User's in room (not owner) UUID
   */
  userId?: string;
}

/**
 * Provides methods to interact with the chat
 */
export class ChatDAL {

  /**
   * Create chat room
   */
  public static async createRoom(params: CreateRoomParams): Promise<Chat> {
    const roomDTO = await ChatService.createRoom({request: {...params}});
    const room = chatDTOToChat(roomDTO);

    return room;
  }

  /**
   * Add user to chat room
   */
  public static async addUserToRoom(params: RoomUserManageParams): Promise<Chat> {
    const roomDTO = await ChatService.addUserToRoom({
      roomId: params.roomId,
      userId: params.userId,
    });
    const room = chatDTOToChat(roomDTO);

    return room;
  }

  /**
   * Delete user from chat room
   */
  public static async deleteUserFromRoom(params: RoomUserManageParams): Promise<Chat> {
    const roomDTO = await ChatService.deleteUserFromRoom(params);
    const room = chatDTOToChat(roomDTO);

    return room;
  }

  /**
   * Get unread message amount in chat room
   */
  public static async getChatPreview(): Promise<number> {
    const unreadMessageAmountDTO = await ChatService.getChatPreview();
    const unreadMessageAmount = unreadMessageAmountDTO.unreadMessagesAmount;

    return unreadMessageAmount;
  }

  /**
   * Get chat room by ID
   */
  public static async getRoomById(roomId: string): Promise<Chat> {
    const roomDTO = await ChatService.getRoomById({roomId});
    const room = chatDTOToChat(roomDTO);

    return room;
  }

  /**
   * Get chat rooms
   */
  public static async getRooms(roomType: RoomType): Promise<AllChatParams> {
    const groupRoomsDTO = await ChatService.getRooms({roomType});
    const chatsPreview = groupRoomsDTO.rooms.map(chatPreviewDTOToChatPreview);

    const groupRooms = {
      size: groupRoomsDTO.size,
      chatsPreview,
    };

    return groupRooms;
  }

  /**
   * Create message in chat room
   */
  public static async createMessageInRoom(params: createMessageInGroupParams): Promise<Message> {
    const messageDTO = await ChatService.createMessageInRoom({
      roomId: params.roomId,
      request: {message: params.message},
    });

    const message = messageDTOToMessage(messageDTO);

    return message;
  }

  /**
   * Update chat room
   */
  public static async updateRoom(roomId: string): Promise<Chat> {
    const groupRoomUpdatedDTO = await ChatService.updateRoom({roomId});
    const groupRoomUpdated = chatDTOToChat(groupRoomUpdatedDTO);

    return groupRoomUpdated;
  }

}
