import ReactGA from "react-ga4";
import {AnalyticsEventName} from "src/analytics/AnalyticsEventName";

/**
 * User activation labels
 * Defined as event_label in analytics
 */
enum HeaderLabel {
  LOGO_CLICKED = "LOGO_CLICKED",
  THEME_CLICKED = "THEME_CLICKED",
  SELECT_LANGUAGE_HEADER_CLICKED = "SELECT_LANGUAGE_HEADER_CLICKED",
  LOG_IN_CLICKED = "LOG_IN_HEADER_CLICKED",
  LOG_IN_WITH_GOOGLE_CLICKED = "LOG_IN_WITH_GOOGLE_CLICKED",
  BURGER_CLICKED = "BURGER_CLICKED",
}

/**
 * Tracking user interaction by clicking buttons
 */
const trackHeaderClick = (label: HeaderLabel) => {
  ReactGA.event({
    category: AnalyticsEventName.HEADER,
    action: AnalyticsEventName.HEADER,
    label,
  });
};

/**
 * Methods to track home page analytics
 */
export class TrackHeader {

  /**
   * Track header logo click
   */
  public static trackLogoClick = () => {
    trackHeaderClick(HeaderLabel.LOGO_CLICKED);
  };

  /**
   *Track header theme click
   */
  public static trackThemeClick = () => {
    trackHeaderClick(HeaderLabel.THEME_CLICKED);
  };

  /**
   * Track header language click
   */
  public static trackSelectLanguageClick = () => {
    trackHeaderClick(HeaderLabel.SELECT_LANGUAGE_HEADER_CLICKED);
  };

  /**
   * Track header login click
   */
  public static trackLoginClick = () => {
    trackHeaderClick(HeaderLabel.LOG_IN_CLICKED);
  };

  /**
   * Track header login with google click
   */
  public static trackLoginWithGoogleClick = () => {
    trackHeaderClick(HeaderLabel.LOG_IN_WITH_GOOGLE_CLICKED);
  };

  /**
   * Track header burger click
   */
  public static trackBurgerStateChanged = () => {
    trackHeaderClick(HeaderLabel.BURGER_CLICKED);
  };

}
