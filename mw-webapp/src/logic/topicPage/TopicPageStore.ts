import {makeAutoObservable} from "mobx";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {load} from "src/hooks/useLoad";
import {Topic} from "src/model/businessModel/Topic";

/**
 * TopicPageStore related methods
 */
export class TopicPageStore {

  /**
   * Topic value
   * Should be initialized!
   */
  public topic!: Topic;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(topicUuid: string) {
    makeAutoObservable(this);
    this.initialize(topicUuid);
  }

  /**
   * Set topic
   */
  private setLoadedData = (loadedData: Topic) => {
    this.topic = loadedData;
  };

  /**
   * Initialize
   */
  private async initialize(topicUuid: string) {
    await load<Topic>({

      /**
       * Load data
       */
      loadData: () => this.loadData(topicUuid),
      validateData: this.validateData,
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });

    this.isInitialized = true;

  }

  /**
   * Load data
   */
  private loadData = async (topicUuid: string): Promise<Topic> => {
    const topic = await TopicDAL.getTopic(topicUuid);

    return topic;
  };

  /**
   * Validate data
   */
  private validateData = (data: Topic) => {
    return !!data;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
