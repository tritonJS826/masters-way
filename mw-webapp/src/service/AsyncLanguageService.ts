/**
 * Available dictionaries
 */
export enum DictionaryKey {
  MENTORS_LANDING = "mentorsLanding",
  LOREM_LANDING = "loremLanding"
}

import type LoremLandingContent from "src/dictionary/landing/LoremLandingContent.json";
import type MentorLandingContent from "src/dictionary/landing/MentorsLandingContent.json";

export type DictionaryTypeMap = {

  /**
   * Types Map
   */
  [DictionaryKey.MENTORS_LANDING]: typeof MentorLandingContent;

  /**
   * Types Map
   */
  [DictionaryKey.LOREM_LANDING]: typeof LoremLandingContent;

};

  /**
   * Import function type for dictionary loading
   */
  type DictionaryImportFunction<K extends DictionaryKey> = () => Promise<{

    /**
     * Default export
     */
    default: DictionaryTypeMap[K];
  }>;

/**
 * Class for asynchronous dictionaries loading
 */
export class AsyncLanguageService {

  /**
   * Dictionary storage map
   */
  private static dictionaryStorage: { [K in DictionaryKey]: DictionaryTypeMap[K]| null } = {

    /**
     * Mentors landing dictionary
     */
    [DictionaryKey.MENTORS_LANDING]: null,

    /**
     * Lorem landing dictionary
     */
    [DictionaryKey.LOREM_LANDING]: null,
  };

  /**
   * Map for import dictionary
   */
  private static dictionaryImportMap: { [K in DictionaryKey]: DictionaryImportFunction<K> } = {

    /**
     * Function for dynamic import mentor landing dictionary
     */
    [DictionaryKey.MENTORS_LANDING]: () => import("src/dictionary/landing/MentorsLandingContent.json"),

    /**
     * Function for dynamic import sample landing dictionary
     */
    [DictionaryKey.LOREM_LANDING]: () => import ("src/dictionary/landing/LoremLandingContent.json"),
  };

  /**
   * Load dictionary
   */
  public static async getDictionary<T extends DictionaryKey>(key: T): Promise<DictionaryTypeMap[T]> {
    // Check if dictionary is already loaded and not null
    const cachedDictionary = this.dictionaryStorage[key];
    if (cachedDictionary !== null) {
      return cachedDictionary;
    }

    // Load the dictionary
    const dictionary = await this.dictionaryImportMap[key]();
    this.dictionaryStorage[key] = dictionary.default;

    return dictionary.default;
  }

}

