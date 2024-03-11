import {
  CreateWayCollectionRequest,
  DeleteWayCollectionRequest,
  GetWayCollectionsByUserUuidRequest,
  SchemasWayCollectionPlainResponse,
  UpdateWayCollectionRequest,
} from "src/apiAutogenerated";
import {wayCollectionService} from "src/serviceUpdated/services";

/**
 * Provides methods to interact with the way collections
 */
export class WayCollectionService {

  /**
   * Create way collection
   */
  public static async createWayCollection(
    requestParameters: CreateWayCollectionRequest,
  ): Promise<SchemasWayCollectionPlainResponse> {
    const wayCollection = await wayCollectionService.createWayCollection(requestParameters);

    return wayCollection;
  }

  /**
   * Get way collections by user UUID
   */
  public static async getWayCollections(
    requestParameters: GetWayCollectionsByUserUuidRequest,
  ): Promise<SchemasWayCollectionPlainResponse[]> {
    const wayCollections = await wayCollectionService.getWayCollectionsByUserUuid(requestParameters);

    return wayCollections;
  }

  /**
   * Update way collection
   */
  public static async updateWayCollection(
    requestParameters: UpdateWayCollectionRequest,
  ): Promise<SchemasWayCollectionPlainResponse> {
    const updatedWayCollection = await wayCollectionService.updateWayCollection(requestParameters);

    return updatedWayCollection;
  }

  /**
   * Delete way collection by UUID
   */
  public static async deleteWayCollection(requestParameters: DeleteWayCollectionRequest): Promise<void> {
    await wayCollectionService.deleteWayCollection(requestParameters);
  }

}
