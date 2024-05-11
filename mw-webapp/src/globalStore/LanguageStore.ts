import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available languages
 */
export enum Language {
  ENGLISH = "en",
  RUSSIAN = "ru",
  UKRAINIAN = "ua",
  GEORGIAN = "ka"
}

/**
 * Default language of the app
 */
export const DEFAULT_LANGUAGE = Language.ENGLISH;

/**
 * All language-related methods
 */
class LanguageStore {

  /**
   * Language value
   * @default {@link DEFAULT_LANGUAGE}
   */
  public language: Language = DEFAULT_LANGUAGE;

  constructor() {
    makeAutoObservable(this);
    this.loadLanguage();
  }

  /**
   * Set language
   */
  public setLanguage = (language: Language) => {
    localStorageWorker.setItemByKey("language", language);
    this.language = language;
  };

  /**
   * Load language
   */
  public loadLanguage = () => {
    const language = localStorageWorker.getItemByKey<Language>("language");

    this.setLanguage(language ?? DEFAULT_LANGUAGE);
  };

  /**
   * Get current language
   */
  public static getCurrentLanguage = () => {
    return localStorageWorker.getItemByKey<Language>("language") ?? DEFAULT_LANGUAGE;
  };

}

export const languageStore = new LanguageStore();
