import {TrainingStudentService} from "src/service/TrainingStudentService";

/**
 * Create training student params
 */
export interface CreateTrainingStudentParams {

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
 * Delete training student params
 */
export interface DeleteTrainingStudentParams {

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
 * Provides methods to interact with the TrainingStudents
 */
export class TrainingStudentDAL {

  /**
   * Add student to the training
   */
  public static async createTrainingStudent(params: CreateTrainingStudentParams): Promise<void> {
    await TrainingStudentService.createTrainingStudent({
      trainingId: params.trainingId,
      userId: params.userId,
    });
  }

  /**
   * Delete student from the training
   */
  public static async deleteTrainingStudent(params: DeleteTrainingStudentParams): Promise<void> {
    await TrainingStudentService.deleteTrainingStudent({
      trainingId: params.trainingId,
      userId: params.userId,
    });
  }

}

