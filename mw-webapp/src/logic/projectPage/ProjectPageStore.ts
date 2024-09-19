import {makeAutoObservable} from "mobx";
import {WayDAL} from "src/dataAccessLogic/WayDAL";
import {load} from "src/hooks/useLoad";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";

type WayPageFirstLoad = {

  /**
   * Way
   */
  way: Way;

  /**
   * Way statistics
   */
  wayStatistics: WayStatisticsTriple;

}

/**
 * ProjectPageStore related methods
 */
export class ProjectPageStore {

  /**
   * Way value
   * Should be initialized!
   */
  public way!: Way;

  /**
   * Way statistics
   * Should be initialized!
   */
  public wayStatisticsTriple!: WayStatisticsTriple;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(wayUuid: string) {
    makeAutoObservable(this);
    this.initialize(wayUuid);
  }

  /**
   * Set way statistics triple
   */
  public setWayStatisticsTriple = (wayStatistics: WayStatisticsTriple) => {
    this.wayStatisticsTriple = wayStatistics;
  };

  /**
   * Update day reports
   */
  public updateDayReports = (dayReports: DayReport[]) => {
    this.way.dayReports = [...dayReports, ...this.way.dayReports];
  };

  /**
   * Update day reports
   */
  public reloadDayReports = (dayReports: DayReport[]) => {
    this.way.dayReports = dayReports;
  };

  /**
   * Set way
   */
  private setLoadedData = (loadedData: WayPageFirstLoad) => {
    this.way = loadedData.way;
    this.wayStatisticsTriple = loadedData.wayStatistics;
  };

  /**
   * Initialize
   */
  private async initialize(wayUuid: string) {
    await load<WayPageFirstLoad>({

      /**
       * Load data
       */
      loadData: () => this.loadData(wayUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (wayUuid: string): Promise<WayPageFirstLoad> => {
    const wayPromise = WayDAL.getWay(wayUuid);
    const wayStatisticsPromise = WayDAL.getWayStatisticTripleById(wayUuid);

    const [way, wayStatistics] = await Promise.all([wayPromise, wayStatisticsPromise]);

    return {way, wayStatistics};
  };

  /**
   * Validate data
   */
  private validateData = (data: WayPageFirstLoad) => {
    return !!data.way && !!data.wayStatistics;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
