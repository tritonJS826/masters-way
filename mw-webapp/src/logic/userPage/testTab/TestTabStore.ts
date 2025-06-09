import {makeAutoObservable} from "mobx";
import {AllTestsByUserParams, TestDAL, TestsAmount} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {DefaultTestCollection} from "src/logic/userPage/DefaultTrainingCollection";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";

/**
 * Get tests by user Id params
 */
export interface GetTestsByUserIdParams {

  /**
   * User's uuid
   */
  userId: string;

  /**
   * Test's type
   */
  testsType: DefaultTestCollection;

}

/**
 * TestTabStore related methods
 */
export class TestTabStore {

  /**
   * All tests preview
   */
  public testsPreview!: TestPreview[];

  /**
   * All tests amount
   */
  public allTestsAmount!: number;

  /**
   * All tests collections amount
   */
  public testCollectionsAmount!: TestsAmount;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(params: GetTestsByUserIdParams) {
    makeAutoObservable(this);
    this.initialize(params);
  }

  /**
   * Set tests preview
   */
  public setTestsPreview = (testsPreview: TestPreview[]) => {
    this.testsPreview = testsPreview;
  };

  /**
   * Set tests amount
   */
  public setTestsAmount = (testsAmount: number) => {
    this.allTestsAmount = testsAmount;
  };

  /**
   * Set test collections amount
   */
  public setTestCollectionsAmount = (testCollectionsAmount: TestsAmount) => {
    this.testCollectionsAmount = testCollectionsAmount;
  };

  /**
   * Load more tests preview
   */
  public loadMoreTestsPreview = async (testName: string, userUuid: string, testType: DefaultTestCollection) => {
    const tests = await this.loadData({
      testsType: testType,
      userId: userUuid,
    });

    this.setTestsPreview([...this.testsPreview, ...tests.testsPreview]);
  };

  /**
   * Load tests preview
   */
  public loadTestsPreview = async (params: GetTestsByUserIdParams) => {
    await load<AllTestsByUserParams>({

      /**
       * Load data
       */
      loadData: () => this.loadData(params),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.onSuccess,
    });
  };

  /**
   * Initialize
   */
  private async initialize(params: GetTestsByUserIdParams) {
    await this.loadTestsPreview(params);
    this.isInitialized = true;
  }

  /**
   * Load data
   */
  private loadData = async (params: GetTestsByUserIdParams): Promise<AllTestsByUserParams> => {
    // Const fetchedTests = await TestDAL.getTestsByUserId({
    //   testsType: params.testsType,
    //   userId: params.userId,
    // });

    const test = new TestPreview({
      createdAt: new Date(),
      description: "lalala",
      name: "sdfes",
      ownerUuid: "7cdb041b-4574-4f7b-a500-c53e74c72e94",
      updatedAt: new Date(),
      uuid: "001",
    });

    const fetchedTests = [test];

    // Return fetchedTests;
    return {
      size: 1,
      testsAmount: {
        completed: 0,
        own: 1,
      },
      testsPreview: fetchedTests,
    };
  };

  /**
   * Validate data
   */
  private validateData = (data: AllTestsByUserParams) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

  /**
   * On success
   */
  private onSuccess = (params: AllTestsByUserParams) => {
    this.setTestsPreview(params.testsPreview);
    this.setTestsAmount(params.size);
    this.setTestCollectionsAmount(params.testsAmount);
  };

  /**
   * Get isMoreTests exist
   */
  public get getIsMoreTestsExist () {
    return this.allTestsAmount > this.testsPreview.length;
  }

}
