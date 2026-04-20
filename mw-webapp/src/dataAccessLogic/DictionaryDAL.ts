import {AsyncLanguageService, DictionaryKey} from "src/service/AsyncLanguageService";

/**
 * Provides methods to interact with the Test model
 */
export class DictionaryDAL {

  /**
   *Get Dictionary
   */
  public static async getDictionary<T extends DictionaryKey>(key: T) {
    const dictionary = await AsyncLanguageService.getDictionary(key);

    return dictionary;
  }

}
