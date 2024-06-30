import ReactGA from "react-ga4";
import {AnalyticsEventName} from "src/analytics/AnalyticsEventName";

/**
 * User activation labels
 * Defined as event_label in analytics
 */
enum UserPageLabel {
    NAME_CHANGED = "NAME_CHANGED",
    DESCRIPTION_CHANGED = "DESCRIPTION_CHANGED",
    MENTOR_STATUS_CLICKED = "MENTOR_STATUS_CLICKED",
    ADD_SKILL_CLICKED = "ADD_SKILL_CLICKED",
    REMOVE_SKILL_CLICKED = "REMOVE_SKILL_CLICKED",
    DONATE_BUTTON_CLICKED = "DONATE_BUTTON_CLICKED",
    UPGRADE_TO_PREMIUM_CLICKED = "UPGRADE_TO_PREMIUM_CLICKED",
    ADD_COLLECTION_CLICKED = "ADD_COLLECTION_CLICKED",
    CREATE_NEW_WAY_CLICKED = "CREATE_NEW_WAY_CLICKED",
    CARD_VIEW_CLICKED = "CARD_VIEW_CLICKED",
    TABLE_VIEW_CLICKED = "TABLE_VIEW_CLICKED"
}

/**
 * Tracking user interaction by clicking buttons
 */
const trackUserPage = (label: UserPageLabel) => {
  ReactGA.event({
    category: AnalyticsEventName.HOME,
    action: AnalyticsEventName.HOME,
    label,
  });
};

/**
 * Methods to track user page analytics
 */
export class TrackUserPage {

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackNameChanged = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackDescriptionChanged = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackMentorStatusClick = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackAddSkillClick = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackRemoveSkillClick = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

  /**
   * Track userPage donate click
   */
  public static trackDonateClick = () => trackUserPage(UserPageLabel.DONATE_BUTTON_CLICKED);

  /**
   * Track userPage upgradeToPremium click
   */
  public static trackUpgradeToPremiumClick = () => trackUserPage(UserPageLabel.UPGRADE_TO_PREMIUM_CLICKED);

}

