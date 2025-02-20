import {Language} from "src/globalStore/LanguageStore";
import {Theme} from "src/globalStore/ThemeStore";
import {MentoringStatusType} from "src/logic/allUsersPage/AllUsersPage";
import {DefaultTrainingCollection} from "src/logic/userPage/UserPage";
import {FILTER_STATUS_ALL_VALUE} from "src/logic/waysTable/BaseWaysTable";
import {WayStatusType} from "src/logic/waysTable/wayStatus";

/**
 * Worker for accessing local storage
 */
class LocalStorageWorker<T extends LocalStorageData> {

  /**
   * If false - local storage is not supported
   */
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
export type LocalStorageData = {

  /**
   * Access token
   */
  accessToken: Token;

  /**
   * Refresh token
   */
  refreshToken: Token;

  /**
   * Device ID
   */
  deviceId: string;

  /**
   * Supported themes
   */
  theme: Theme;

  /**
   * Supported languages
   */
  language: Language;

  /**
   * Notification block settings
   */
  notificationBlock: NotificationBlockSettings;

  /**
   * Way page data
   */
  wayPage: WayPageSettings;

  /**
   * User page data
   */
  userPage: UserPageSettings;

  /**
   * Project page data
   */
  projectPage: ProjectPageSettings;

  /**
   * Id of opened collection
   * Be careful this data should be deprecated and tab with this id sometimes could not be exist
   */
  ["userPage.openedTabId"]: string;

  /**
   * All ways page data
   */
  allWaysPage: AllWaysPageSettings;

  /**
   * All users page data
   */
  allUsersPage: AllUsersPageSettings;

  /**
   * All trainings page data
   */
  allTrainingsPage: AllTrainingsPageSettings;

  /**
   * Is OS notification enabled
   */
  isOSNotificationEnabled: boolean;

}

/**
 * Available way views
 */
export enum View {
  Card = "Card",
  Table = "Table",
}

/**
 * Available user's  tabs
 */
export enum TabType {
  Ways = "Ways",
  Projects = "Projects",
  Trainings = "Trainings"
}

export type Token = {

  /**
   * Access token
   */
  token: string | null;
}

/**
 * Available metrics visibility filters
 */
export enum GoalMetricsFilter {
  ALL = "All",
  INCOMPLETE = "Incomplete",
  NONE = "None",
}

/**
 * Way page settings
 */
export type WayPageSettings = {

  /**
   * Metrics visibility filter
   */
  goalMetricsFilter: GoalMetricsFilter;

  /**
   * Is statistics block visible
   */
  isStatisticsVisible: boolean;

  /**
   * Day reports view
   */
  view: View;

}

export const DEFAULT_WAY_PAGE_SETTINGS: WayPageSettings = {
  goalMetricsFilter: GoalMetricsFilter.ALL,
  isStatisticsVisible: true,
  view: View.Card,
};

/**
 * Notification block settings
 */
export type NotificationBlockSettings = {

  /**
   * Is only new notifications
   */
  isOnlyNew: boolean;
}

export type UserPageSettings = {

  /**
   * Settled filter by statuses
   */
  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE;

  /**
   * Settled view
   */
  view: View;

  /**
   * Settled tab
   */
  tab: TabType;

  /**
   * Id of opened training collection
   */
  trainingCollection: DefaultTrainingCollection;

}

export type ProjectPageSettings = {

  /**
   * Settled filter by statuses
   */
  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE;

  /**
   * Settled view
   */
  view: View;
}

export type AllWaysPageSettings = {

  /**
   * Settled filter by statuses
   */
  filterStatus: WayStatusType | typeof FILTER_STATUS_ALL_VALUE;

  /**
   * Settled view
   */
  view: View;

  /**
   * Only ways with day reports amount grater than here will be shown
   */
  minDayReportsAmount: number;

  /**
   * Part of way name
   */
  wayName: string;
}

export type AllTrainingsPageSettings = {

  /**
   * Settled view
   */
  view: View;

  /**
   * Part of training name
   */
  trainingName: string;
}

export type AllUsersPageSettings = {

  /**
   * Settled filter by statuses
   */
  filterStatus: MentoringStatusType;

  /**
   * Settled view
   */
  view: View;

  /**
   * User name
   */
  name: string;

  /**
   * User email
   */
  email: string;
}
