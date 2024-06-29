import ReactGA from "react-ga4";
import {AnalyticsCategory} from "src/analytics/AnalyticsCategory";

/**
 * Header actions
 */
enum HeaderAction {
  HEADER_CLICKED = "HEADER_CLICKED"
}

/**
 * User activation labels
 */
enum HeaderLabel {
  LOGO_CLICKED = "LOGO_CLICKED",
  THEME_CLICKED = "THEME_CLICKED",
  SELECT_LANGUAGE_HEADER_CLICKED = "SELECT_LANGUAGE_HEADER_CLICKED",
  LOG_IN_CLICKED = "LOG_IN_HEADER_CLICKED",
  LOG_IN_WITH_GOOGLE_CLICKED = "LOG_IN_WITH_GOOGLE_CLICKED",
  BURGER_CLICKED = "BURGER_CLICKED",
  UPGRADE_TO_PREMIUM_CLICKED = "UPGRADE_TO_PREMIUM_CLICKED",
  DONATE_CLICKED = "DONATE_CLICKED",
}

/**
 * Tracking user interaction by clicking buttons
 */
const trackHeaderClick = (action: HeaderLabel) => {
  ReactGA.event({
    category: AnalyticsCategory.HEADER,
    action,
    label: HeaderAction.HEADER_CLICKED + action,
  });
};

/**
 * Track header logo click
 */
export const trackLogoClick = () => trackHeaderClick(HeaderLabel.LOGO_CLICKED);

/**
 *Track header theme click
 */
export const trackThemeClick = () => trackHeaderClick(HeaderLabel.THEME_CLICKED);

/**
 * Track header language click
 */
export const trackSelectLanguageClick = () => trackHeaderClick(HeaderLabel.SELECT_LANGUAGE_HEADER_CLICKED);

/**
 * Track header login click
 */
export const trackLoginClick = () => trackHeaderClick(HeaderLabel.LOG_IN_CLICKED);

/**
 * Track header login with google click
 */
export const trackLoginWithGoogleClick = () => trackHeaderClick(HeaderLabel.LOG_IN_WITH_GOOGLE_CLICKED);

/**
 * Track header burger click
 */
export const trackBurgerStateChanged = () => trackHeaderClick(HeaderLabel.BURGER_CLICKED);

/**
 * Track header upgradeToPremium click
 */
export const trackUpgradeToPremiumClick = () => trackHeaderClick(HeaderLabel.UPGRADE_TO_PREMIUM_CLICKED);

/**
 * Track header donate click
 */
export const trackDonateClick = () => trackHeaderClick(HeaderLabel.DONATE_CLICKED);
