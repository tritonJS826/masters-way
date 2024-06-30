import ReactGA from "react-ga4";
import {AnalyticsEventName} from "src/analytics/AnalyticsEventName";

/**
 * User activation labels
 * Defined as event_label in analytics
 */
enum HomeLabel {
  START_FOR_FREE_FIRST_SCREEN_CLICKED = "START_FOR_FREE_FIRST_SCREEN_CLICKED",
  START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED = "START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED",
  TRY_NOW_CLICKED = "TRY_NOW_CLICKED",
  READ_MANIFESTO_CLICKED = "READ_MANIFESTO_CLICKED"
}

/**
 * Tracking user interaction by clicking buttons
 */
const trackHome = (label: HomeLabel) => {
  ReactGA.event({
    category: AnalyticsEventName.HOME,
    action: AnalyticsEventName.HOME,
    label,
  });
};

/**
 * Methods to track home page analytics
 */
export class TrackHomePage {

  /**
   * Track home start button first block click
   */
  public static startForFreeFirstBlockClicked = () => {
    trackHome(HomeLabel.START_FOR_FREE_FIRST_SCREEN_CLICKED);
  };

  /**
   * Track home start button who we are block click
   */
  public static startForFreeWhoWeAreBlockClicked = () => {
    trackHome(HomeLabel.START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED);
  };

  /**
   * Track home try now button click
   */
  public static tryNowClicked = () => {
    trackHome(HomeLabel.TRY_NOW_CLICKED);
  };

  /**
   * Track home read manifesto click
   */
  public static readManifestClicked = () => {
    trackHome(HomeLabel.READ_MANIFESTO_CLICKED);
  };

}

