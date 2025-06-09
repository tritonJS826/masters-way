import {testSessionResultDTOToTestSessionResult}
  from "src/dataAccessLogic/DTOToPreviewConverter/testSessionResultDTOToTestSessionResult";
import {TestSessionResult} from "src/model/businessModel/TestSessionResult";
import {testSessionResultService} from "src/service/services";

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
      .getTestSessionResultBySessionUuid({request: {sessionUuid: params.sessionUuid}});

    const testSessionResult = testSessionResultDTOToTestSessionResult(testSessionResultDTO);

    return testSessionResult;
  }

}

