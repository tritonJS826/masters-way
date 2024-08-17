import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import common from "src/dictionary/CommonContent.json";
import errorContent from "src/dictionary/ErrorContent.json";
import headerContent from "src/dictionary/Header.json";
import homePageContent from "src/dictionary/HomePageContent.json";
import modals from "src/dictionary/Modals.json";
import settings from "src/dictionary/SettingsPageContent.json";
import sidebar from "src/dictionary/Sidebar.json";
import userPageContent from "src/dictionary/UserPageContent.json";
import wayPageContent from "src/dictionary/WayPageContent.json";

/**
 * Language service (access to dictionaries)
 */
export class LanguageService {

  /**
   * Sidebar content
   */
  public static get sidebar() {
    return sidebar;
  }

  /**
   * Header block content
   */
  public static get header() {
    return headerContent;
  }

  /**
   * About project page content
   */
  public static get aboutProject() {
    return aboutProjectPageContent;
  }

  /**
   * About project page content
   */
  public static get allWays() {
    return allWaysPageContent;
  }

  /**
   * About project page content
   */
  public static get allUsers() {
    return allUsersPageContent;
  }

  /**
   * Home page content
   */
  public static get home() {
    return homePageContent;
  }

  /**
   * About project page content
   */
  public static get user() {
    return userPageContent;
  }

  /**
   * About project page content
   */
  public static get way() {
    return wayPageContent;
  }

  /**
   * About project page content
   */
  public static get settings() {
    return settings;
  }

  /**
   * Modals content
   */
  public static get modals() {
    return modals;
  }

  /**
   * Common content
   */
  public static get common() {
    return common;
  }

  /**
   * Errors content
   */
  public static get error() {
    return errorContent;
  }

}
