import {makeAutoObservable} from "mobx";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {load} from "src/hooks/useLoad";
import {Way} from "src/model/businessModel/Way";

/**
 * WayPageStore related methods
 */
export class WayPageStore {

  /**
   * Way value
   */
  public way!: Way;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(wayUuid: string) {
    makeAutoObservable(this);
    this.initialize(wayUuid);
  }

  /**
   * Set way
   */
  public setWay = (way: Way) => {
    this.way = way;
  };

  /**
   * Initialize
   */
  private async initialize(wayUuid: string) {
    await load<Way>({

      /**
       * Load data
       */
      loadData: () => this.loadData(wayUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setWay,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (wayUuid: string): Promise<Way> => {
    const fetchedWay = await WayDAL.getWay(wayUuid);

    return fetchedWay;
  };

  /**
   * Validate data
   */
  private validateData = (data: Way) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
