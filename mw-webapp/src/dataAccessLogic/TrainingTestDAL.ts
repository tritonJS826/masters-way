import {trainingTestService} from "src/service/services";

/**
 * Create training test params
 */
export interface CreateTrainingTestParams {

  /**
   * Training uuid
   */
  trainingUuid: string;

  /**
   * Test's name
   */
  testUuid: string;

}

/**
 * Provides methods to interact with the TrainingTests
 */
export class TrainingTestDAL {

  /**
   * Create training test
   */
  public static async createTrainingTest(params: CreateTrainingTestParams): Promise<void> {
    await trainingTestService.trainingTestPost({
      request: {
        testUuid: params.testUuid,
        trainingUuid: params.trainingUuid,
      },
    });

  }

}

