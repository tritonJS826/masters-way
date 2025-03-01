import {makeAutoObservable} from "mobx";
import {AllTrainingsByUserParams, TrainingDAL, TrainingsAmount} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {DefaultTrainingCollection} from "src/logic/userPage/DefaultTrainingCollection";
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
   * All training collections amount
   */
  public trainingCollectionsAmount!: TrainingsAmount;

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
   * Set training collections amount
   */
  public setTrainingCollectionsAmount = (trainingCollectionsAmount: TrainingsAmount) => {
    this.trainingCollectionsAmount = trainingCollectionsAmount;
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
    await load<AllTrainingsByUserParams>({

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
  private loadData = async (params: GetTrainingsByUserIdParams): Promise<AllTrainingsByUserParams> => {
    const fetchedTrainings = await TrainingDAL.getTrainingsByUserId({
      trainingsType: params.trainingsType,
      userId: params.userId,
    });

    return fetchedTrainings;
  };

  /**
   * Validate data
   */
  private validateData = (data: AllTrainingsByUserParams) => {
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
  private onSuccess = (params: AllTrainingsByUserParams) => {
    this.setTrainingsPreview(params.trainingsPreview);
    this.setTrainingsAmount(params.size);
    this.setTrainingCollectionsAmount(params.trainingsAmount);
  };

  /**
   * Get isMoreTrainings exist
   */
  public get getIsMoreTrainingsExist () {
    return this.allTrainingsAmount > this.trainingsPreview.length;
  }

}
