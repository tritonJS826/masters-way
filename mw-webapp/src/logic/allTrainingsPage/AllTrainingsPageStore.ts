import {makeAutoObservable} from "mobx";
import {AllTrainingsParams, GetTrainingsParams, TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;

/**
 * AllTrainingsPageStore related methods
 */
export class AllTrainingsPageStore {

  /**
   * All trainings
   */
  public allTrainings!: TrainingPreview[];

  /**
   * All trainings amount
   */
  public allTrainingsAmount!: number;

  /**
   * Page pagination
   */
  public pagePagination: number = DEFAULT_PAGE_PAGINATION_VALUE;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(params: GetTrainingsParams) {
    makeAutoObservable(this);
    this.initialize(params);
  }

  /**
   * Set trainings
   */
  public setTrainings = (trainings: TrainingPreview[]) => {
    this.allTrainings = trainings;
  };

  /**
   * Set trainings amount
   */
  public setTrainingsAmount = (trainingsAmount: number) => {
    this.allTrainingsAmount = trainingsAmount;
  };

  /**
   * Set page pagination
   */
  public setPagePagination = (nextPage: number) => {
    this.pagePagination = nextPage;
  };

  /**
   * Load more trainings
   */
  public loadMoreTrainings = async (trainingName: string) => {
    const nextPage = this.pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;

    const trainings = await this.loadData({
      page: nextPage,
      trainingName,
    });

    this.setTrainings([...this.allTrainings, ...trainings.trainingsPreview]);
  };

  /**
   * Load trainings
   */
  public loadTrainings = async (params: GetTrainingsParams) => {
    await load<AllTrainingsParams>({

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
  private async initialize(params: GetTrainingsParams) {
    await this.loadTrainings(params);
    this.isInitialized = true;
  }

  /**
   * Load data
   */
  private loadData = async (params: GetTrainingsParams): Promise<AllTrainingsParams> => {
    const fetchedTrainings = await TrainingDAL.getTrainings(params);

    return fetchedTrainings;
  };

  /**
   * Validate data
   */
  private validateData = (data: AllTrainingsParams) => {
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
  private onSuccess = (params: AllTrainingsParams) => {
    this.setTrainings(params.trainingsPreview);
    this.setTrainingsAmount(params.size);
  };

  /**
   * Get isMoreTrainings exist
   */
  public get getIsMoreTrainingsExist () {
    return this.allTrainingsAmount > this.allTrainings.length;
  }

}
