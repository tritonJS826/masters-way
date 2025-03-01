import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available languages
 */
export enum Language {
  ENGLISH = "en",
  RUSSIAN = "ru",
  UKRAINIAN = "ua"
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
   * Falls back to DEFAULT_LANGUAGE if invalid language is provided
   */
  public setLanguage = (language: Language) => {
    const validatedLanguage = this.validateLanguage(language) ? language : DEFAULT_LANGUAGE;
    localStorageWorker.setItemByKey("language", validatedLanguage);
    this.language = validatedLanguage;
  };

  /**
   * Load language
   */
  public loadLanguage = () => {
    const language = localStorageWorker.getItemByKey<Language>("language");

    this.setLanguage(language ?? DEFAULT_LANGUAGE);
  };

  /**
   * Validate language
   */
  public validateLanguage = (language: Language) => {
    return Object.values(Language).includes(language);
  };

}

export const languageStore = new LanguageStore();
