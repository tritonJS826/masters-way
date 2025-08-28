import {DictionaryKey, LazyLoadLanguageService} from "src/service/LazyLoadLanguageService";

/**
 * Provides methods to interact with the Test model
 */
export class DictionaryDAL {

  /**
   *Get Dictionary
   */
  public static async getDictionary<T extends DictionaryKey>(key: T) {
    const dictionary = await LazyLoadLanguageService.getDictionary(key);

    return dictionary;
  }

}
