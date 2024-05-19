import {SchemasWayCollectionPlainResponse} from "src/apiAutogenerated";
import {WayCollection} from "src/model/businessModel/User";
import {WayCollectionService} from "src/service/WayCollectionService";

/**
 * Params for createWayCollection
 */
interface createWayCollectionParams {

  /**
   * Owner ID
   */
  ownerUuid: string;

  /**
   * Collection name
   */
  collectionName: string;
}

/**
 * Params for updateWayCollection
 */
interface updateWayCollectionParams {

  /**
   * Owner ID
   */
  ownerUuid: string;

  /**
   * Collection ID
   */
  collectionUuid: string;

  /**
   * Collection name to update
   */
  collectionName: string;
}

/**
 * Provides methods to interact with the WayCollection model
 */
export class WayCollectionDAL {

  /**
   * Create wayCollection
   */
  public static async createWayCollection(params: createWayCollectionParams): Promise<WayCollection> {
    const wayCollectionDTO: SchemasWayCollectionPlainResponse = await WayCollectionService.createWayCollection({
      request: {
        name: params.collectionName,
        ownerUuid: params.ownerUuid,
      },
    });

    const wayCollection = new WayCollection({
      uuid: wayCollectionDTO.uuid,
      name: wayCollectionDTO.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerUuid: params.ownerUuid,
      ways: [],
    });

    return wayCollection;
  }

  /**
   * Update wayCollection
   */
  public static async updateWayCollection(params: updateWayCollectionParams): Promise<WayCollection> {
    const updatedWayCollectionDTO = await WayCollectionService.updateWayCollection({
      wayCollectionId: params.collectionUuid,
      request: {name: params.collectionName},
    });

    const updatedWayCollection = new WayCollection({
      createdAt: new Date(),
      name: updatedWayCollectionDTO.name,
      ownerUuid: params.ownerUuid,
      updatedAt: new Date(),
      uuid: updatedWayCollectionDTO.uuid,
      ways: [],
    });

    return updatedWayCollection;
  }

  /**
   * Delete wayCollection
   */
  public static async deleteWayCollection(wayCollectionId: string): Promise<void> {
    await WayCollectionService.deleteWayCollection({wayCollectionId});
  }

}
