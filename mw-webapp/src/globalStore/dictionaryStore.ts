import {makeAutoObservable, runInAction} from "mobx";
import {DictionaryDAL} from "src/dataAccessLogic/DictionaryDAL";
import {load} from "src/hooks/useLoad";
import {DictionaryKey, DictionaryTypeMap} from "src/service/AsyncLanguageService";

/**
 * DictionaryStore related methods
 */
export class DictionaryStore<T extends DictionaryKey> {

  /**
   * Dictionary value
   * Should be initialized!
   */
  public dictionary!: DictionaryTypeMap[T];

  /**
   * Dictionary key
   */
  public dictionaryKey: T;

  /**
   * If it is false - store is not initialized and can't be used safely
   */
  public isInitialized: boolean = false;

  constructor(dictionaryKey: T) {
    this.dictionaryKey = dictionaryKey;
    makeAutoObservable(this);
    this.initialize();
  }

  /**
   * Set dictionary
   */
  public setLoadedData = (loadedData: DictionaryTypeMap[T]) => {
    this.dictionary = loadedData;
  };

  /**
   * Initialize
   */
  public async initialize() {
    await load<DictionaryTypeMap[T]>({

      /**
       * Load data
       */
      loadData: () => this.loadData(),
      onError: this.onError,
      onSuccess: this.setLoadedData,
    });
    runInAction(() => {
      this.isInitialized = true;
    });

  }

  /**
   * Load data
   */
  private loadData = async () => {
    const dictionary = await DictionaryDAL.getDictionary(this.dictionaryKey);

    return dictionary;
  };

  /**
   * On error
   */
  private onError = (error: Error) => {
    throw (error);
  };

}
