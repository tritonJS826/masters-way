import {makeAutoObservable} from "mobx";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {Question, Test} from "src/model/businessModel/Test";

/**
 * RunningTestPageStore related methods
 */
export class RunningTestPageStore {

  /**
   * Test value
   * Should be initialized!
   */
  public test!: Test;

  /**
   * Active question uuid
   */
  public activeQuestion!: Question;

  /**
   * Active order
   */
  public activeOrder: number = 0;

  /**
   * QuestionResults for manage running questions and answers
   */
  public questionResults!: Map<string, QuestionResult>;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(testUuid: string) {
    makeAutoObservable(this);
    this.initialize(testUuid);
  }

  /**
   * Make next question active
   */
  public nextQuestion = () => {
    this.activeOrder++;
    this.activeQuestion = this.test.questions[this.activeOrder];
  };

  /**
   * Make previous question active
   */
  public prevQuestion = () => {
    this.activeOrder--;
    this.activeQuestion = this.test.questions[this.activeOrder];
  };

  /**
   * Save question result after user save answer
   */
  public saveQuestionResult = (questionResult: QuestionResult) => {
    this.questionResults.set(questionResult.questionUuid, questionResult);
  };

  /**
   * Set test
   */
  private setLoadedData = (loadedData: Test) => {
    this.test = loadedData;
    this.activeQuestion = this.test.questions[0];
    this.questionResults = new Map<string, QuestionResult>;
  };

  /**
   * Initialize
   */
  private async initialize(testUuid: string) {
    await load<Test>({

      /**
       * Load data
       */
      loadData: () => this.loadData(testUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });
    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (testUuid: string): Promise<Test> => {
    const test = await TestDAL.getTest(testUuid);

    return test;
  };

  /**
   * Validate data
   */
  private validateData = (data: Test) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
