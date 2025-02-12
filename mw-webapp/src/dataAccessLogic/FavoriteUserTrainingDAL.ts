import {FavoriteUserTrainingService} from "src/service/FavoriteUserTrainingService";

/**
 * Provides methods to interact with the FavoriteUserTraining model
 */
export class FavoriteUserTrainingDAL {

  /**
   * Create favorite user training
   */
  public static async createFavoriteUserTraining(trainingUuid: string): Promise<void> {
    await FavoriteUserTrainingService.createFavoriteUserTraining({trainingId: trainingUuid});
  }

  /**
   * Delete favorite user training
   */
  public static async deleteFavoriteUserTraining(trainingUuid: string): Promise<void> {
    await FavoriteUserTrainingService.deleteFavoriteUserTraining({trainingId: trainingUuid});
  }

}
