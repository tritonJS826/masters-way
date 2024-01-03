import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Available languages
 */
export enum Language {
  ENGLISH = "en",
  RUSSIAN = "ru"
}

/**
 * Default language of the app
 */
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
    const language = localStorageWorker.getItemByKey<Language>("language");

    this.setLanguage(language ?? DEFAULT_LANGUAGE);
  }

  /**
   * Get current language
   */
  public static getCurrentLanguage() {
    return localStorageWorker.getItemByKey<Language>("language");
  }

}
