import {favoriteUserService} from "src/service/services";

/**
 * Params for {@link FavoriteUserDAL.createFavoriteUser}
 */
interface CreateFavoriteUserParams {

  /**
   * User uuid who click on provide feedback
   */
  acceptorUserUuid: string;

  /**
   * User uuid who accept feedback
   */
  donorUserUuid: string;
}

/**
 * Provides methods to interact with the FavoriteUser model
 */
export class FavoriteUserDAL {

  /**
   * Create favorite user way
   */
  public static async createFavoriteUser(params: CreateFavoriteUserParams): Promise<void> {
    await favoriteUserService.createFavoriteUser({
      request: {
        acceptorUserUuid: params.acceptorUserUuid,
        donorUserUuid: params.donorUserUuid,
      },
    });
  }

  /**
   * Delete favorite user way
   */
  public static async deleteFavoriteUser(params: CreateFavoriteUserParams): Promise<void> {
    await favoriteUserService.deleteFavoriteUser({
      acceptorUserUuid: params.acceptorUserUuid,
      donorUserUuid: params.donorUserUuid,
    });
  }

}
