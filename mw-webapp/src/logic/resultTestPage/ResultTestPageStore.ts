import {makeAutoObservable} from "mobx";
import {QuestionResultDAL} from "src/dataAccessLogic/QuestionResultDAL";
import {load} from "src/hooks/useLoad";
import {QuestionResult} from "src/model/businessModel/QuestionResult";

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
  private setLoadedData = (loadedData: QuestionResult[]) => {
    this.questionResults = loadedData;
  };

  /**
   * Initialize
   */
  private async initialize(sessionId: string) {
    await load<QuestionResult[]>({

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
  private loadData = async (sessionId: string): Promise<QuestionResult[]> => {
    const questionResults = await QuestionResultDAL.getQuestionResultsBySessionUuid({sessionId});

    return questionResults;
  };

  /**
   * Validate data
   */
  private validateData = (data: QuestionResult[]) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
