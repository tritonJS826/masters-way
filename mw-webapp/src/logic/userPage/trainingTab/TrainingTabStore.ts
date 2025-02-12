import {makeAutoObservable} from "mobx";
import {AllTrainingsParams, TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {DefaultTrainingCollection} from "src/logic/userPage/UserPage";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";

/**
 * Get trainings by user Id params
 */
export interface GetTrainingsByUserIdParams {

  /**
   * User's uuid
   */
  userId: string;

  /**
   * Training's type
   */
  trainingsType: DefaultTrainingCollection;

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
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(params: GetTrainingsByUserIdParams) {
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
   * Load more trainings preview
   */
  public loadMoreTrainingsPreview = async (trainingName: string, userUuid: string, trainingType: DefaultTrainingCollection) => {
    const trainings = await this.loadData({
      userId: userUuid,
      trainingsType: trainingType,
    });

    this.setTrainingsPreview([...this.trainingsPreview, ...trainings.trainingsPreview]);
  };

  /**
   * Load trainings preview
   */
  public loadTrainingsPreview = async (params: GetTrainingsByUserIdParams) => {
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
  private async initialize(params: GetTrainingsByUserIdParams) {
    await this.loadTrainingsPreview(params);
    this.isInitialized = true;
  }

  /**
   * Load data
   */
  private loadData = async (params: GetTrainingsByUserIdParams): Promise<AllTrainingsParams> => {
    const fetchedTrainings = await TrainingDAL.getTrainingsByUserId({
      trainingsType: params.trainingsType,
      userId: params.userId,
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
