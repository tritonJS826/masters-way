import {CreateFavoriteUserRequest, DeleteFavoriteUserRequest} from "src/apiAutogenerated";
import {favoriteUserService} from "src/service/services";

/**
 * Provides methods to interact with the Favorite users
 */
export class FavoriteUserService {

  /**
   * Create favorite user
   */
  public static async createFavoriteUser(requestParameters: CreateFavoriteUserRequest): Promise<void> {
    await favoriteUserService.createFavoriteUser(requestParameters);
  }

  /**
   * Delete favorite user
   */
  public static async deleteFavoriteUser(requestParameters: DeleteFavoriteUserRequest): Promise<void> {
    await favoriteUserService.deleteFavoriteUser(requestParameters);
  }

}
