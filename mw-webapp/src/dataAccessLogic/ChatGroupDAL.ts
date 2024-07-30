import {
  SchemasDeclineRequestToGroupRoomResponse,
  SchemasGetRequestsToGroupRoomResponse,
} from "src/apiAutogenerated/chat";
import {AllChatParams} from "src/dataAccessLogic/ChatP2pDAL";
import {chatDTOToChat} from "src/dataAccessLogic/DTOToPreviewConverter/chatDTOToChat";
import {chatPreviewDTOToChatPreview} from "src/dataAccessLogic/DTOToPreviewConverter/chatPreviewDTOToChatPreview";
import {messageDTOToMessage} from "src/dataAccessLogic/DTOToPreviewConverter/messageDTOToMessage";
import {Chat} from "src/model/businessModel/Chat";
import {Message} from "src/model/businessModel/Message";
import {ChatGroupService} from "src/service/ChatGroupService";

/**
 * Add user to group chat params
 */
interface AddUserToGroupParams {

  /**
   * Chat ID
   */
  groupRoomId: string;

  /**
   * USer ID
   */
  userId: string;
}

/**
 * Add user from group chat params
 */
interface DeleteUserFromGroupParams {

  /**
   * Chat ID
   */
  groupRoomId: string;

  /**
   * USer ID
   */
  userId: string;
}

/**
 * Create message in group chat params
 */
interface createMessageInGroupParams {

  /**
   * Chat ID
   */
  groupRoomId: string;

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
 * Create request to group params
 */
interface createRequestToGroupParams {

  /**
   * Cgat ID
   */
  roomId: string;

  /**
   * USer ID
   */
  userId: string;
}

/**
 * Provides methods to interact with the group room
 */
export class ChatGroupDAL {

  /**
   * Create group room
   */
  public static async createGroupRoom(params: RequestInit): Promise<Chat> {
    const groupRoomDTO = await ChatGroupService.createGroupRoom(params);
    const groupRoom = chatDTOToChat(groupRoomDTO);

    return groupRoom;
  }

  /**
   * Accept request to group chat room
   */
  public static async acceptRequestToGroupRoom(groupRoomId: string): Promise<Chat> {
    const groupRoomDTO = await ChatGroupService.acceptRequestToGroupRoom({groupRoomId});
    const groupRoom = chatDTOToChat(groupRoomDTO);

    return groupRoom;
  }

  /**
   * Add user to group chat room
   */
  public static async addUserToGroup(params: AddUserToGroupParams): Promise<Chat> {
    const groupRoomDTO = await ChatGroupService.addUserToGroup({
      groupRoomId: params.groupRoomId,
      userId: params.userId,
    });
    const groupRoom = chatDTOToChat(groupRoomDTO);

    return groupRoom;
  }

  /**
   * Decline request to group chat room
   */
  public static async declineRequestToGroupRoom(groupRoomId: string): Promise<SchemasDeclineRequestToGroupRoomResponse> {
    const groupRoom = await ChatGroupService.declineRequestToGroupRoom({groupRoomId});

    return groupRoom;
  }

  /**
   * Delete user from group chat room
   */
  public static async deleteUserFromGroup(requestParameters: DeleteUserFromGroupParams): Promise<Chat> {
    const groupRoomDTO = await ChatGroupService.deleteUserFromGroup(requestParameters);
    const groupRoom = chatDTOToChat(groupRoomDTO);

    return groupRoom;
  }

  /**
   * Get group chat room by ID
   */
  public static async getGroupRoomById(groupRoomId: string): Promise<Chat> {
    const groupRoomDTO = await ChatGroupService.getGroupRoomById({groupRoomId});
    const groupRoom = chatDTOToChat(groupRoomDTO);

    return groupRoom;
  }

  /**
   * Get group chat rooms
   */
  public static async getGroupRooms(requestParameters: RequestInit): Promise<AllChatParams> {
    const groupRoomsDTO = await ChatGroupService.getGroupRooms(requestParameters);
    const chatsPreview = groupRoomsDTO.rooms.map(chatPreviewDTOToChatPreview);

    const groupRooms = {
      size: groupRoomsDTO.size,
      chatsPreview,
    };

    return groupRooms;
  }

  /**
   * Get requests to group chat room
   */
  public static async getRequestsToGroupRoom(requestParameters: RequestInit): Promise<SchemasGetRequestsToGroupRoomResponse> {
    const requestsToGroupRoom = await ChatGroupService.getRequestsToGroupRoom(requestParameters);

    return requestsToGroupRoom;
  }

  /**
   * Create message in group chat room
   */
  public static async createMessageInGroupRoom(params: createMessageInGroupParams): Promise<Message> {
    const messageDTO = await ChatGroupService.createMessageInGroupRoom({
      groupRoomId: params.groupRoomId,
      request: {
        message: params.message,
        roomId: params.roomId,
      },
    });

    const message = messageDTOToMessage(messageDTO);

    return message;
  }

  /**
   * Create request to group chat room
   */
  public static async createRequestToGroupRoom(params: createRequestToGroupParams): Promise<void> {
    await ChatGroupService.createRequestToGroupRoom({
      request: {
        roomId: params.roomId,
        userId: params.userId,
      },
    });
  }

  /**
   * Update group chat room
   */
  public static async updateGroupRooms(groupRoomId: string): Promise<Chat> {
    const groupRoomUpdatedDTO = await ChatGroupService.updateGroupRooms({groupRoomId});
    const groupRoomUpdated = chatDTOToChat(groupRoomUpdatedDTO);

    return groupRoomUpdated;
  }

}