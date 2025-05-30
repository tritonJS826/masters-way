import {questionToQuestionDTOPartial} from "src/dataAccessLogic/BusinessToDTOConverter/questionToQuestionDTOPartial";
import {questionDTOToQuestion} from "src/dataAccessLogic/DTOToPreviewConverter/questionDTOToQuestion";
import {Question} from "src/model/businessModel/Test";
import {questionService} from "src/service/services";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Create question params
 */
export interface CreateQuestionParams {

  /**
   * Test uuid
   */
  testUuid: string;

  /**
   * Question text
   */
  questionText: string;

  /**
   * Practice type
   */
  practiceType: string;

  /**
   * Question name
   */
  name: string;

  /**
   * Question's right answer
   */
  answer: string;

  /**
   * Time to answer in seconds
   */
  timeToAnswer: number;

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
 * Provides methods to interact with the Questions
 */
export class QuestionDAL {

  /**
   * Create question
   */
  public static async createQuestion(params: CreateQuestionParams): Promise<Question> {
    const questionDTO = await questionService.createQuestion({
      request: {
        answer: params.answer,
        name: params.name,
        practiceType: params.practiceType,
        questionText: params.questionText,
        testUuid: params.testUuid,
        timeToAnswer: params.timeToAnswer,
      },
    });

    const question = questionDTOToQuestion(questionDTO);

    return question;
  }

  /**
   * Update question
   */
  public static async updateQuestion(question: PartialWithUuid<Question>): Promise<Question> {
    const questionDTOPartial = questionToQuestionDTOPartial(question);

    const updatedQuestionDTO = await questionService.updateQuestion({
      questionId: question.uuid,
      request: questionDTOPartial,
    });

    const updatedQuestion = questionDTOToQuestion(updatedQuestionDTO);

    return updatedQuestion;
  }

  /**
   * Delete question
   */
  public static async deleteQuestion(questionId: string): Promise<void> {
    await questionService.deleteQuestion({questionId});
  }

}

