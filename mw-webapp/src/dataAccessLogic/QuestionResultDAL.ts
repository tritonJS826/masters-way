import {questionResultDTOToQuestionResult} from "src/dataAccessLogic/DTOToPreviewConverter/questionResultDTOToQuestionResult";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {questionResultService} from "src/service/services";

/**
 * Create question result params
 */
export interface CreateQuestionResultParams {

  /**
   * If true the answer on the question is right
   */
  isOk: boolean;

  /**
   * Question uuid
   */
  questionUuid: string;

  /**
   * Result description
   */
  resultDescription: string;

  /**
   * Test session uuid
   */
  testSessionUuid: string;

  /**
   * Test uuid
   */
  testUuid: string;

  /**
   * User uuid
   */
  userUuid: string;

}

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
   * Create question result
   */
  public static async createQuestionResult(params: CreateQuestionResultParams): Promise<QuestionResult> {
    const questionResultsDTO = await questionResultService.createQuestionResult({
      request: {
        isOk: params.isOk,
        questionUuid: params.questionUuid,
        resultDescription: params.resultDescription,
        testSessionUuid: params.testSessionUuid,
        testUuid: params.testUuid,
        userUuid: params.userUuid,
      },
    });

    const questionResults = questionResultDTOToQuestionResult(questionResultsDTO);

    return questionResults;
  }

  /**
   * Get question results by session Uuid
   */
  public static async getQuestionResultsBySessionUuid(params: GetQuestionResultsBySessionUuidParams): Promise<QuestionResult[]> {
    const questionResultsDTO = await questionResultService.getQuestionResultsBySessionUuid({sessionId: params.sessionId});
    console.log("FTO", questionResultsDTO);
    const questionResults = questionResultsDTO.map(questionResultDTOToQuestionResult);

    return questionResults;
  }

}

