import {TrainingMentorService} from "src/service/TrainingMentorService";

/**
 * Create training mentor params
 */
export interface CreateTrainingMentorParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * User's uuid
   */
  userId: string;
}

/**
 * Delete training mentor params
 */
export interface DeleteTrainingMentorParams {

  /**
   * Training uuid
   */
  trainingId: string;

  /**
   * User's uuid
   */
  userId: string;
}

/**
 * Provides methods to interact with the TrainingMentors
 */
export class TrainingMentorDAL {

  /**
   * Add mentor to the training
   */
  public static async createTrainingMentor(params: CreateTrainingMentorParams): Promise<void> {
    await TrainingMentorService.createTrainingMentor({
      trainingId: params.trainingId,
      userId: params.userId,
    });
  }

  /**
   * Delete mentor from the training
   */
  public static async deleteTrainingMentor(params: DeleteTrainingMentorParams): Promise<void> {
    await TrainingMentorService.deleteTrainingMentor({
      trainingId: params.trainingId,
      userId: params.userId,
    });
  }

}

