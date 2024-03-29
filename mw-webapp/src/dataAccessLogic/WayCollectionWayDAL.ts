import {WayCollectionWayService} from "src/service/wayCollectionWaySevice";

/**
 * Provides methods to interact with the WayCollectionWay model
 */
export class WayCollectionWayDAL {

  /**
   * Add way to wayCollection
   */
  public static async createWayCollectionWay(wayCollectionUuid: string, wayUuid: string): Promise<void> {
    await WayCollectionWayService.createWayCollectionWay({
      request: {
        wayCollectionUuid,
        wayUuid,
      },
    });
  }

  /**
   * Delete way from wayCollection
   */
  public static async deleteWayCollectionWay(wayCollectionId: string, wayId: string): Promise<void> {
    await WayCollectionWayService.deleteWayCollectionWay({
      wayCollectionId,
      wayId,
    });
  }

}
