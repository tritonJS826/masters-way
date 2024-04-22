import {CreateFavoriteUserWayRequest, DeleteFavoriteUserWayRequest} from "src/apiAutogenerated";
import {favoriteUserWayService} from "src/service/services";

/**
 * Provides methods to interact with the favoriteUserWay
 */
export class FavoriteUserWayService {

  /**
   * Create favorite user way
   */
  public static async createFavoriteUserWay(requestParameters: CreateFavoriteUserWayRequest): Promise<void> {
    await favoriteUserWayService.createFavoriteUserWay(requestParameters);
  }

  /**
   * Delete favorite user way
   */
  public static async deleteFavoriteUserWay(requestParameters: DeleteFavoriteUserWayRequest): Promise<void> {
    await favoriteUserWayService.deleteFavoriteUserWay(requestParameters);
  }

}
