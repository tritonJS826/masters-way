import {makeAutoObservable} from "mobx";
import {AllTestsParams, GetTestsParams, TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;

/**
 * AllTestsPageStore related methods
 */
export class AllTestsPageStore {

  /**
   * All tests
   */
  public allTests!: TestPreview[];

  /**
   * All tests amount
   */
  public allTestsAmount!: number;

  /**
   * Page pagination
   */
  public pagePagination: number = DEFAULT_PAGE_PAGINATION_VALUE;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(params: GetTestsParams) {
    makeAutoObservable(this);
    this.initialize(params);
  }

  /**
   * Set tests
   */
  public setTests = (tests: TestPreview[]) => {
    this.allTests = tests;
  };

  /**
   * Set tests amount
   */
  public setTestsAmount = (testsAmount: number) => {
    this.allTestsAmount = testsAmount;
  };

  /**
   * Set page pagination
   */
  public setPagePagination = (nextPage: number) => {
    this.pagePagination = nextPage;
  };

  /**
   * Load more tests
   */
  public loadMoreTests = async (testName: string) => {
    const nextPage = this.pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;

    const tests = await this.loadData({
      page: nextPage,
      testName,
    });

    this.setTests([...this.allTests, ...tests.testsPreview]);
  };

  /**
   * Load tests
   */
  public loadTests = async (params: GetTestsParams) => {
    await load<AllTestsParams>({

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
  private async initialize(params: GetTestsParams) {
    await this.loadTests(params);
    this.isInitialized = true;
  }

  /**
   * Load data
   */
  private loadData = async (params: GetTestsParams): Promise<AllTestsParams> => {
    const fetchedTests = await TestDAL.getTests(params);

    return fetchedTests;
  };

  /**
   * Validate data
   */
  private validateData = (data: AllTestsParams) => {
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
  private onSuccess = (params: AllTestsParams) => {
    this.setTests(params.testsPreview);
    this.setTestsAmount(params.size);
  };

  /**
   * Get isMoreTests exist
   */
  public get getIsMoreTestsExist () {
    return this.allTestsAmount > this.allTests.length;
  }

}
