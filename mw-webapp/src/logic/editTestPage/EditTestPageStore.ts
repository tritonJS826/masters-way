import {makeAutoObservable} from "mobx";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {Question, Test} from "src/model/businessModel/Test";

/**
 * EditTestPageStore related methods
 */
export class EditTestPageStore {

  /**
   * Test value
   * Should be initialized!
   */
  public test!: Test;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(testUuid: string) {
    makeAutoObservable(this);
    this.initialize(testUuid);
  }

  /**
   * Set test
   */
  private setLoadedData = (loadedData: Test) => {
    this.test = loadedData;
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
    // Const test = await TestDAL.getTest(testUuid);

    const question = new Question({
      answer: "asda",
      createdAt: new Date(),
      isActive: false,
      order: 1,
      questionText: "sdfsfewfewfwe",
      testUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
      timeToAnswer: 60,
      updatedAt: new Date(),
      uuid: "7cdb041b-4574-4f7b-a500-c53e74c72e88",
    });
    const question2 = new Question({
      answer: "asda",
      createdAt: new Date(),
      isActive: false,
      order: 1,
      questionText: "sdfsfewfewfwe",
      testUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
      timeToAnswer: 60,
      updatedAt: new Date(),
      uuid: "7cdb041b-4574-4f7b-a500-c53e74c72e88",
    });

    const test1 = new Test({
      createdAt: new Date(),
      description: "lololo",
      name: "lalala",
      ownerUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e94",
      questions: [question, question2],
      updatedAt: new Date(),
      uuid: "7cdb041b-4574-4f7b-a500-c53e74c72e90",
    });

    return test1;
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
