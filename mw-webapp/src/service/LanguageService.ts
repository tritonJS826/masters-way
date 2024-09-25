import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import common from "src/dictionary/CommonContent.json";
import errorContent from "src/dictionary/ErrorContent.json";
import headerContent from "src/dictionary/Header.json";
import homePageContent from "src/dictionary/HomePageContent.json";
import businessLanding from "src/dictionary/landing/BusinessLandingContent.json";
import mentorsLanding from "src/dictionary/landing/MentorsLandingContent.json";
import studentsWithMentorsLanding from "src/dictionary/landing/StudentsWithMentorsLandingContent.json";
import studentsWithAiLanding from "src/dictionary/landing/StudentWithAILandingContent.json";
import modals from "src/dictionary/Modals.json";
import pricing from "src/dictionary/PricingContent.json";
import project from "src/dictionary/ProjectPageContent.json";
import settings from "src/dictionary/SettingsPageContent.json";
import sidebar from "src/dictionary/Sidebar.json";
import survey from "src/dictionary/SurveyModalsContent.json";
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
   * All ways page content
   */
  public static get allWays() {
    return allWaysPageContent;
  }

  /**
   * All users page content
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
   * User page content
   */
  public static get user() {
    return userPageContent;
  }

  /**
   * Way page content
   */
  public static get way() {
    return wayPageContent;
  }

  /**
   * Project page content
   */
  public static get project() {
    return project;
  }

  /**
   * Settings page content
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
   * Survey modals content
   */
  public static get survey() {
    return survey;
  }

  /**
   * Pricing page content
   */
  public static get pricing() {
    return pricing;
  }

  /**
   * Mentor's landing content
   */
  public static get mentorsLanding() {
    return mentorsLanding;
  }

  /**
   * Students with AI landing content
   */
  public static get studentsWithAiLanding() {
    return studentsWithAiLanding;
  }

  /**
   * Students with Mentors landing content
   */
  public static get studentsWithMentorsLanding() {
    return studentsWithMentorsLanding;
  }

  /**
   * Business landing content
   */
  public static get businessLanding() {
    return businessLanding;
  }

  /**
   * Error page content
   */
  public static get error() {
    return errorContent;
  }

}
