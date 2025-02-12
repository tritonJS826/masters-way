import {makeAutoObservable} from "mobx";
import {TrainingDAL} from "src/dataAccessLogic/TrainingDAL";
import {load} from "src/hooks/useLoad";
import {Training} from "src/model/businessModel/Training";

/**
 * TrainingPageStore related methods
 */
export class TrainingPageStore {

  /**
   * Training value
   * Should be initialized!
   */
  public training!: Training;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(trainingUuid: string) {
    makeAutoObservable(this);
    this.initialize(trainingUuid);
  }

  /**
   * Set way
   */
  private setLoadedData = (loadedData: Training) => {
    this.training = loadedData;
  };

  /**
   * Initialize
   */
  private async initialize(trainingUuid: string) {
    await load<Training>({

      /**
       * Load data
       */
      loadData: () => this.loadData(trainingUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (trainingUuid: string): Promise<Training> => {
    const training = await TrainingDAL.getTraining(trainingUuid);

    return training;
  };

  /**
   * Validate data
   */
  private validateData = (data: Training) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
