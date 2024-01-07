import {Language} from "src/utils/LanguageWorker";
import {Theme} from "src/utils/ThemeWorker";

/**
 * Worker for accessing local storage
 */
class LocalStorageWorker<T extends LocalStorageData> {

  public isLocalStorageSupported: boolean;

  constructor() {
    this.isLocalStorageSupported = typeof window["localStorage"] !== "undefined" && window["localStorage"] !== null;
  }

  /**
   * Set item to localstorage
   */
  public setItemByKey(key: keyof T, value: T[keyof T]): void {
    this.checkLocalStorageSupport();
    localStorage.setItem(String(key), JSON.stringify(value));
  }

  /**
   * Check is Item in storage
   */
  public isItemExist(key: keyof T): boolean {
    this.checkLocalStorageSupport();

    return !!localStorage.getItem(String(key));
  }

  /**
   * Get Item by key
   */
  public getItemByKey<U extends T[keyof T]>(key: keyof T): U | null {
    this.checkLocalStorageSupport();

    return JSON.parse(String(localStorage.getItem(String(key))));
  }

  /**
   * Remove item by key
   */
  public removeItemByKey(key: keyof T): void {
    this.checkLocalStorageSupport();
    localStorage.removeItem(String(key));
  }

  /**
   * Check local storage support
   */
  private checkLocalStorageSupport() {
    if (!this.isLocalStorageSupported) {
      throw new Error("Local storage is not supported");
    }
  }

}

export const localStorageWorker = new LocalStorageWorker();

/**
 * Available localStorage items of {@link LocalStorageData}
 * Keys of {@link LocalStorageData} is a localStorage  items keys
 * Value of {@link LocalStorageData} is a localStorage items values
 */
type LocalStorageData = {

  /**
   * Supported themes
   */
  theme: Theme;

  /**
   * Supported languages
   */
  language: Language;

  /**
   * Supported way
   */
  way: string;

}

