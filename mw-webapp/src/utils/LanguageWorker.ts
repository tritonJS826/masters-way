import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Available languages
 */
export enum Language {
  ENGLISH = "english",
  RUSSIAN = "russian"
}

export const DEFAULT_LANGUAGE = Language.ENGLISH;

/**
 * All language-related methods
 */
export class LanguageWorker {

  /**
   * Set language
   */
  public static setLanguage(language: Language) {
    localStorageWorker.setItemByKey("language", language);
  }

  /**
   * Load language
   */
  public static loadLanguage() {
    const language = localStorageWorker.getItemByKey("language");
    // TODO: font use as
    this.setLanguage(language as Language ?? DEFAULT_LANGUAGE);
  }

  /**
   * Get current language
   */
  public static getCurrentLanguage() {
    return localStorageWorker.getItemByKey("language");
  }

}
