import {questionResultDTOToQuestionResult} from "src/dataAccessLogic/DTOToPreviewConverter/questionResultDTOToQuestionResult";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {questionResultService} from "src/service/services";

/**
 * Get question results by session uuid params
 */
export interface GetQuestionResultsBySessionUuidParams {

  /**
   * Session uuid
   */
  sessionId: string;

}

/**
 * Provides methods to interact with the QuestionResults
 */
export class QuestionResultDAL {

  /**
   * Get question results by session Uuid
   */
  public static async getQuestionResultsBySessionUuid(params: GetQuestionResultsBySessionUuidParams): Promise<QuestionResult[]> {
    const questionResultsDTO = await questionResultService.getQuestionResultsBySessionUuid({sessionId: params.sessionId});
    const questionResults = questionResultsDTO.map(questionResultDTOToQuestionResult);

    return questionResults;
  }

}

