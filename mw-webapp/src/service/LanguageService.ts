import aboutProjectPageContent from "src/dictionary/AboutProjectPageContent.json";
import allTestsPageContent from "src/dictionary/AllTestsPageContent.json";
import allTrainingsPageContent from "src/dictionary/AllTrainingsPageContent.json";
import allUsersPageContent from "src/dictionary/AllUsersPageContent.json";
import allWaysPageContent from "src/dictionary/AllWaysPageContent.json";
import common from "src/dictionary/CommonContent.json";
import errorContent from "src/dictionary/ErrorContent.json";
import headerContent from "src/dictionary/Header.json";
import homePageContent from "src/dictionary/HomePageContent.json";
import businessLanding from "src/dictionary/landing/BusinessLandingContent.json";
import loremLanding from "src/dictionary/landing/LoremLandingContent.json";
import mentorsLanding from "src/dictionary/landing/MentorsLandingContent.json";
import studentsWithMentorsLanding from "src/dictionary/landing/StudentsWithMentorsLandingContent.json";
import studentsWithAiLanding from "src/dictionary/landing/StudentWithAILandingContent.json";
import trainingWithAiLanding from "src/dictionary/landing/TrainingWithAILandingContent.json";
import modals from "src/dictionary/Modals.json";
import notificationBlockContent from "src/dictionary/NotificationBLockContent.json";
import partnershipPageContent from "src/dictionary/PartnershipPageContent.json";
import pricing from "src/dictionary/PricingContent.json";
import project from "src/dictionary/ProjectPageContent.json";
import settings from "src/dictionary/SettingsPageContent.json";
import sidebar from "src/dictionary/Sidebar.json";
import survey from "src/dictionary/SurveyModalsContent.json";
import testPageContent from "src/dictionary/TestPageContent.json";
import topicPageContent from "src/dictionary/TopicPageContent.json";
import trainingPageContent from "src/dictionary/TrainingPageContent.json";
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
   * All trainings page content
   */
  public static get allTrainings() {
    return allTrainingsPageContent;
  }

  /**
   * All tests page content
   */
  public static get allTests() {
    return allTestsPageContent;
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
   * Training page content
   */
  public static get training() {
    return trainingPageContent;
  }

  /**
   * Test page content
   */
  public static get test() {
    return testPageContent;
  }

  /**
   * Topic page content
   */
  public static get topic() {
    return topicPageContent;
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
   * Notification block content
   */
  public static get notifications() {
    return notificationBlockContent;
  }

  /**
   * Common content
   */
  public static get common() {
    return common;
  }

  /**
   * Partners page content
   */
  public static get partnership() {
    return partnershipPageContent;
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
   * Training with AI landing content
   */
  public static get trainingWithAiLanding() {
    return trainingWithAiLanding;
  }

  /**
   * Lorem landing content
   */
  public static get loremLanding() {
    return loremLanding;
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
