import {DictionaryLoader} from "src/utils/DependencyLazyLoader/dependencies/dictionaryLoader";

/**
 * LazyLoader class to load dictionary only once
 */
export class DictionaryLazyLoader {

  /**
   * DictionaryLoader instance
   */
  private static dictionaryLoader = new DictionaryLoader();

  /**
   * Get DictionaryLoader instance
   */
  public static getDictionaryLoader(): DictionaryLoader {
    return this.dictionaryLoader;
  }

}
