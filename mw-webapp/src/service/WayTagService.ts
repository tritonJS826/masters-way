import {
  CreateWayTagRequest,
  DeleteWayTagRequest,
  SchemasWayTagResponse,
} from "src/apiAutogenerated";
import {wayTagService} from "src/service/services";

/**
 * Provides methods to interact with the way tags
 */
export class WayTagService {

  /**
   * Create way tag
   */
  public static async addWayTagToWay(requestParameters: CreateWayTagRequest): Promise<SchemasWayTagResponse> {
    const wayTag = await wayTagService.createWayTag(requestParameters);

    return wayTag;
  }

  /**
   * Delete way tag by UUID
   */
  public static async deleteWayTag(requestParameters: DeleteWayTagRequest): Promise<void> {
    await wayTagService.deleteWayTag(requestParameters);
  }

}

