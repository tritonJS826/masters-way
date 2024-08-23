import ReactGA from "react-ga4";
import {AnalyticsEventName} from "src/analytics/AnalyticsEventName";

/**
 * User activation labels
 * Defined as event_label in analytics
 */
enum FooterLabel {
  APP_STORE_CLICKED = "APP_STORE_CLICKED",
  PLAY_MARKET_CLICKED = "PLAY_MARKET_CLICKED",
}

/**
 * Tracking user interaction by clicking buttons
 */
const trackFooterClick = (label: FooterLabel) => {
  ReactGA.event({
    category: AnalyticsEventName.FOOTER,
    action: AnalyticsEventName.FOOTER,
    label,
  });
};

/**
 * Methods to track footer analytics
 */
export class TrackFooter {

  /**
   * Track app store icon click
   */
  public static trackAppStoreIconClick = () => {
    trackFooterClick(FooterLabel.APP_STORE_CLICKED);
  };

  /**
   *Track play market icon click
   */
  public static trackPlayMarketIconClick = () => {
    trackFooterClick(FooterLabel.PLAY_MARKET_CLICKED);
  };

}
