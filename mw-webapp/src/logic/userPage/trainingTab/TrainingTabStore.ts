import {makeAutoObservable} from "mobx";
import {AllTrainingsParams, GetTrainingsParams, TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {DefaultTrainingCollection} from "src/logic/userPage/UserPage";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";

const DEFAULT_PAGE_PAGINATION_VALUE = 1;

/**
 * GEt trainings by user params
 */
export interface GetTrainingsByUserParams extends GetTrainingsParams {

  /**
   * User page Uuid
   */
  userPageOwnerUuid: string;
}

/**
 * TrainingTabStore related methods
 */
export class TrainingTabStore {

  /**
   * All trainings preview
   */
  public trainingsPreview!: TrainingPreview[];

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

  constructor(params: GetTrainingsByUserParams) {
    makeAutoObservable(this);
    this.initialize(params);
  }

  /**
   * Set trainings preview
   */
  public setTrainingsPreview = (trainingsPreview: TrainingPreview[]) => {
    this.trainingsPreview = trainingsPreview;
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
   * Load more trainings preview
   */
  public loadMoreTrainingsPreview = async (trainingName: string, userUuid: string, trainingType: DefaultTrainingCollection) => {
    const nextPage = this.pagePagination + DEFAULT_PAGE_PAGINATION_VALUE;

    const trainings = await this.loadData({
      page: nextPage,
      trainingName,
      userPageOwnerUuid: userUuid,
      trainingType,
    });

    this.setTrainingsPreview([...this.trainingsPreview, ...trainings.trainingsPreview]);
  };

  /**
   * Load trainings preview
   */
  public loadTrainingsPreview = async (params: GetTrainingsByUserParams) => {
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
  private async initialize(params: GetTrainingsByUserParams) {
    await this.loadTrainingsPreview(params);
    this.isInitialized = true;
  }

  /**
   * Load data
   */
  private loadData = async (params: GetTrainingsByUserParams): Promise<AllTrainingsParams> => {
    const fetchedTrainings = await TrainingDAL.getTrainingsByUserId({
      trainingType: params.trainingType,
      userId: params.userPageOwnerUuid,
    });

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
    this.setTrainingsPreview(params.trainingsPreview);
    this.setTrainingsAmount(params.size);
  };

  /**
   * Get isMoreTrainings exist
   */
  public get getIsMoreTrainingsExist () {
    return this.allTrainingsAmount > this.trainingsPreview.length;
  }

}
