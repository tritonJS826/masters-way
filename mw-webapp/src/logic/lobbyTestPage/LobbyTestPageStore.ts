import {makeAutoObservable} from "mobx";
import {TestDAL} from "src/dataAccessLogic/TestDAL";
import {load} from "src/hooks/useLoad";
import {Test} from "src/model/businessModel/Test";

/**
 * LobbyTestPageStore related methods
 */
export class LobbyTestPageStore {

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
