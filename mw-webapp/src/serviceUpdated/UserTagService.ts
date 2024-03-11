import {
  CreateUserTagRequest,
  DeleteUserTagRequest,
  GetUserTagsByUserUuidRequest,
  SchemasUserTagResponse,
  UpdateUserTagRequest,
} from "src/apiAutogenerated";
import {userTagService} from "src/serviceUpdated/services";

/**
 * Provides methods to interact with the user tags
 */
export class UserTagService {

  /**
   * Create user tag
   */
  public static async createUserTag(requestParameters: CreateUserTagRequest): Promise<SchemasUserTagResponse> {
    const userTag = await userTagService.createUserTag(requestParameters);

    return userTag;
  }

  /**
   * Get user tags by user UUID
   */
  public static async GetUserTags(requestParameters: GetUserTagsByUserUuidRequest): Promise<SchemasUserTagResponse[]> {
    const userTags = await userTagService.getUserTagsByUserUuid(requestParameters);

    return userTags;
  }

  /**
   * Update user tag by user UUID
   */
  public static async updateUserTag(requestParameters: UpdateUserTagRequest): Promise<SchemasUserTagResponse> {
    const updatedUserTag = await userTagService.updateUserTag(requestParameters);

    return updatedUserTag;
  }

  /**
   * Delete user tag by UUID
   */
  public static async deleteUserTag(requestParameters: DeleteUserTagRequest): Promise<void> {
    await userTagService.deleteUserTag(requestParameters);
  }

}
