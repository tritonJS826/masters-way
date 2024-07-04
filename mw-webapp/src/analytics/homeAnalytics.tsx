import ReactGA from "react-ga4";
import {AnalyticsEventName} from "src/analytics/AnalyticsEventName";

/**
 * User activation labels
 * Defined as event_label in analytics
 */
enum HomeLabel {
  STUDENT_VIDEO_BUTTON_CLICKED = "STUDENT_VIDEO_BUTTON_CLICKED_TEST",
  MENTOR_VIDEO_BUTTON_CLICKED = "MENTOR_VIDEO_BUTTON_CLICKED_TEST",
  START_FOR_FREE_FIRST_SCREEN_CLICKED = "START_FOR_FREE_FIRST_SCREEN_CLICKED_TEST",
  START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED = "START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED_TEST",
  TRY_NOW_CLICKED = "TRY_NOW_CLICKED_TEST",
  READ_MANIFESTO_CLICKED = "READ_MANIFESTO_CLICKED_TEST",
  VIEW_ALL_WAYS_CLICKED = "VIEW_ALL_WAYS_CLICKED_TEST"
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
   * Track home student video button
   */
  public static studentVideoClicked = () => {
    trackHome(HomeLabel.STUDENT_VIDEO_BUTTON_CLICKED);
  };

  /**
   * Track home mentor video button
   */
  public static mentorVideoClicked = () => {
    trackHome(HomeLabel.MENTOR_VIDEO_BUTTON_CLICKED);
  };

  /**
   * Track home start button first block click
   */
  public static startForFreeFirstBlockClicked = () => {
    trackHome(HomeLabel.START_FOR_FREE_FIRST_SCREEN_CLICKED);
  };

  /**
   * Track home view allWays button click
   */
  public static viewAllWaysClicked = () => {
    trackHome(HomeLabel.VIEW_ALL_WAYS_CLICKED);
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

