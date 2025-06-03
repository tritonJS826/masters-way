import {makeAutoObservable} from "mobx";
import {SessionDAL} from "src/dataAccessLogic/SessionDAL";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
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
   * Test session uuid
   */
  public testSessionUuid!: string;

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
   * Set test
   */
  private setLoadedData = (loadedData: Test) => {
    this.test = loadedData;
  };

  /**
   * Initialize
   */
  private async initialize(testUuid: string, userUuid: string) {
    const testSession = await this.createTestSession(userUuid);
    this.testSessionUuid = testSession;
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

    // Const question = new Question({
    //   answer: "asda",
    //   createdAt: new Date(),
    //   isActive: true,
    //   order: 1,
    //   questionText: "aaaaaa",
    //   testUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
    //   timeToAnswer: 60,
    //   updatedAt: new Date(),
    //   uuid: "7cdb041b-4574-4f7b-a502-c53e74c72e88",
    // });
    // const question2 = new Question({
    //   answer: "asda",
    //   createdAt: new Date(),
    //   isActive: false,
    //   order: 2,
    //   questionText: "sdfsfewfewfwe",
    //   testUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
    //   timeToAnswer: 60,
    //   updatedAt: new Date(),
    //   uuid: "7cdb041b-4574-4f7b-a500-c53e74c72e88",
    // });

    // const test1 = new Test({
    //   createdAt: new Date(),
    //   description: "lololo",
    //   name: "lalala",
    //   ownerUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e94",
    //   questions: [question, question2],
    //   updatedAt: new Date(),
    //   uuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
    // });

    this.activeQuestion = test.questions[0];

    return test;
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
