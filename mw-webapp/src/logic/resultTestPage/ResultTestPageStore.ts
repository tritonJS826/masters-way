import {makeAutoObservable} from "mobx";
import {QuestionResultDAL} from "src/dataAccessLogic/QuestionResultDAL";
import {TestSessionResultDAL} from "src/dataAccessLogic/TestSessionResultDAL";
import {load} from "src/hooks/useLoad";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {TestSessionResult} from "src/model/businessModel/TestSessionResult";

/**
 * Test's results
 */
interface ResultsParams {

  /**
   * Session result generated AI or mentor
   */
  sessionResult: TestSessionResult;

  /**
   * Question results
   */
  questionResults: QuestionResult[];

}

/**
 * ResultTestPageStore related methods
 */
export class ResultTestPageStore {

  /**
   * Question results value
   * Should be initialized!
   */
  public questionResults!: QuestionResult[];

  /**
   * Session result value
   * Should be initialized!
   */
  public sessionResult!: TestSessionResult;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(sessionId: string) {
    makeAutoObservable(this);
    this.initialize(sessionId);
  }

  /**
   * Set test
   */
  private setLoadedData = (loadedData: ResultsParams) => {
    this.questionResults = loadedData.questionResults;
    this.sessionResult = loadedData.sessionResult;
  };

  /**
   * Initialize
   */
  private async initialize(sessionId: string) {
    await load<ResultsParams>({

      /**
       * Load data
       */
      loadData: () => this.loadData(sessionId),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });
    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (sessionId: string): Promise<ResultsParams> => {
    const questionResults = await QuestionResultDAL.getQuestionResultsBySessionUuid({sessionId});
    const sessionResult = await TestSessionResultDAL.getTestSessionResult({sessionUuid: sessionId});

    return {
      questionResults,
      sessionResult,
    };
  };

  /**
   * Validate data
   */
  private validateData = (data: ResultsParams) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
