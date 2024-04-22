import {FavoriteUserWayService} from "src/service/FavoriteUserWayService";

/**
 * Provides methods to interact with the FavoriteUserWay model
 */
export class FavoriteUserWayDAL {

  /**
   * Create favorite user way
   */
  public static async createFavoriteUserWay(userUuid: string, wayUuid: string): Promise<void> {
    await FavoriteUserWayService.createFavoriteUserWay({
      request: {
        userUuid,
        wayUuid,
      },
    });
  }

  /**
   * Delete favorite user way
   */
  public static async deleteFavoriteUserWay(userUuid: string, wayUuid: string): Promise<void> {
    await FavoriteUserWayService.deleteFavoriteUserWay({
      userUuid,
      wayUuid,
    });
  }

}
