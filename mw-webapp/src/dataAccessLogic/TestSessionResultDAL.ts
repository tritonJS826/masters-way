import {testSessionResultDTOToTestSessionResult}
  from "src/dataAccessLogic/DTOToPreviewConverter/testSessionResultDTOToTestSessionResult";
import {TestSessionResult} from "src/model/businessModel/TestSessionResult";
import {testSessionResultService} from "src/service/services";

/**
 * Create test session result params
 */
export interface CreateTestSessionResultParams {

  /**
   * Session uuid
   */
  sessionUuid: string;

  /**
   * Result description written by mentor
   */
  resultDescription?: string;

   /**
    * Test's uuid
    */
   testUuid: string;

}

/**
 * Get test session result params
 */
export interface GetTestSessionResultParams {

  /**
   * Session uuid
   */
  sessionUuid: string;

}

/**
 * Provides methods to interact with the TestSessionResult
 */
export class TestSessionResultDAL {

  /**
   * Get test session result
   */
  public static async getTestSessionResult(params: GetTestSessionResultParams): Promise<TestSessionResult> {
    const testSessionResultDTO = await testSessionResultService
      .getTestSessionResultBySessionUuid({sessionId: params.sessionUuid});

    const testSessionResult = testSessionResultDTOToTestSessionResult(testSessionResultDTO);

    return testSessionResult;
  }

  /**
   * Create test session result
   */
  public static async createTestSessionResult(params: CreateTestSessionResultParams): Promise<TestSessionResult> {
    const testSessionResultDTO = await testSessionResultService
      .createTestSessionResultBySessionUuid({
        request: {
          sessionUuid: params.sessionUuid,
          resultDescription: params.resultDescription,
          testUuid: params.testUuid,
        },
      });

    const testSessionResult = testSessionResultDTOToTestSessionResult(testSessionResultDTO);

    return testSessionResult;
  }

}

