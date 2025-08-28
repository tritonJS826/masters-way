/**
 * Enum for different dictionaries
 */
export enum DictionaryKey {
  MENTORS_LANDING = "mentorsLanding",
}

import type MentorLandingContent from "src/dictionary/landing/MentorsLandingContent.json";

export type DictionaryTypeMap = {

  /**
   * Types Map
   */
  [DictionaryKey.MENTORS_LANDING]: typeof MentorLandingContent;

};

export const dictionaryImportMap = {

  /**
   * Function for dynamic import of dictionaries
   */
  [DictionaryKey.MENTORS_LANDING]: () => import("src/dictionary/landing/MentorsLandingContent.json"),
};

/**
 * Class for asynchronous dictionaries loading
 */
export class LazyLoadLanguageService {

  /**
   * DictionaryVariable
   */
  public static mentorsLanding: typeof MentorLandingContent;

  /**
   * Pre-load mentors landing dictionary
   */
  public static async getDictionary<T extends DictionaryKey>(key: T): Promise<DictionaryTypeMap[T]> {

    const dictionary = await dictionaryImportMap[key]();
    this.mentorsLanding = dictionary.default;

    return this.mentorsLanding;
  }

}
