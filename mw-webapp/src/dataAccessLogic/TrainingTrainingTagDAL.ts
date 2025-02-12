import {TrainingTrainingTagService} from "src/service/TrainingTrainingTagService";

/**
 * Create training training tag params
 */
export interface CreateTrainingTrainingTagParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * Training tag's name
   */
  name: string;
}

/**
 * Delete training training tag params
 */
export interface DeleteTrainingTrainingTagParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * Training tag's name
   */
  trainingTagName: string;
}

/**
 * Provides methods to interact with the TrainingTrainingTags
 */
export class TrainingTrainingTagDAL {

  /**
   * Create trainingTrainingTag
   */
  public static async createTrainingTrainingTag(params: CreateTrainingTrainingTagParams): Promise<void> {
    await TrainingTrainingTagService.createTrainingTrainingTag({
      trainingId: params.trainingId,
      request: {name: params.name},
    });
  }

  /**
   * Delete trainingTrainingTag
   */
  public static async deleteTrainingTrainingTag(params: DeleteTrainingTrainingTagParams): Promise<void> {
    await TrainingTrainingTagService.deleteTrainingTrainingTag({
      trainingId: params.trainingId,
      trainingTagName: params.trainingTagName,
    });
  }

}

