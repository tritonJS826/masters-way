import {makeAutoObservable} from "mobx";
import {SessionDAL} from "src/dataAccessLogic/SessionDAL";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {Question, Test} from "src/model/businessModel/Test";

/**
 * Test data for initialization
 */
interface TestDataParams {

  /**
   * Loaded test
   */
  test: Test;

  /**
   * Test session Uuid
   */
  testSession: string;
}

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
   * Test session uuid
   */
  public testSessionUuid!: string;

  /**
   * QuestionResults for manage running questions and answers
   */
  public questionResults!: Map<string, QuestionResult>;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(testUuid: string, userUuid: string) {
    makeAutoObservable(this);
    this.initialize(testUuid, userUuid);
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
    this.questionResults.set(questionResult.uuid, questionResult);
  };

  /**
   * Set test
   */
  private setLoadedData = (loadedData: TestDataParams) => {
    this.test = loadedData.test;
    this.testSessionUuid = loadedData.testSession;
    this.activeQuestion = this.test.questions[0];
    this.questionResults = new Map<string, QuestionResult>;
  };

  /**
   * Initialize
   */
  private async initialize(testUuid: string, userUuid: string) {
    await load<TestDataParams>({

      /**
       * Load data
       */
      loadData: () => this.loadData(testUuid, userUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });
    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (testUuid: string, userUuid: string): Promise<TestDataParams> => {
    const test = await TestDAL.getTest(testUuid);
    const testSession = await this.createTestSession(userUuid);

    return {
      test,
      testSession,
    };
  };

  /**
   * Create test session
   */
  private createTestSession = async (userUuid: string) => {
    const sessionUuid = await SessionDAL.createSession({userUuid});

    return sessionUuid;
  };

  /**
   * Validate data
   */
  private validateData = (data: TestDataParams) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
