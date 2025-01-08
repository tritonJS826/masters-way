import {makeAutoObservable} from "mobx";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";

/**
 * TrainingTabStore related methods
 */
export class TrainingTabStore {

  /**
   * User value
   */
  public trainingsPreview!: TrainingPreview[];

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(userPageOwnerUuid: string) {
    makeAutoObservable(this);
    this.initialize(userPageOwnerUuid);
  }

  /**
   * Set trainings preview
   */
  public setTrainingsPreview = (trainingsPreview: TrainingPreview[]) => {
    this.trainingsPreview = trainingsPreview;
  };

  /**
   * Initialize
   */
  private async initialize(userPageOwnerUuid: string) {
    await load<TrainingPreview[]>({

      /**
       * Load data
       */
      loadData: () => this.loadData(userPageOwnerUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setTrainingsPreview,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (userPageOwnerUuid: string): Promise<TrainingPreview[]> => {
    const fetchedTrainings = await TrainingDAL.getTrainingsByUserId({
      trainingType: "student",
      userId: userPageOwnerUuid,
    });

    return fetchedTrainings.trainingsPreview;
  };

  /**
   * Validate data
   */
  private validateData = (data: TrainingPreview[]) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
