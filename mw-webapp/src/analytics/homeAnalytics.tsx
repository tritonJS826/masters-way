import ReactGA from "react-ga4";
import {AnalyticsCategory} from "src/analytics/AnalyticsCategory";

/**
 * User activation actions
 */
enum UserActivationAction {
  GET_STARTED_CLICKED = "GET_STARTED_CLICKED"
}

/**
 * User activation labels
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
const trackHome = (hameLabel: HomeLabel) => {
  ReactGA.event({
    category: AnalyticsCategory.HOME,
    action: UserActivationAction.GET_STARTED_CLICKED,
    label: hameLabel,
  });
};

/**
 * Track home start button first block click
 */
export const startForFreeFirstBlockClicked = () => trackHome(HomeLabel.START_FOR_FREE_FIRST_SCREEN_CLICKED);

/**
 * Track home start button who we are block click
 */
export const startForFreeWhoWeAreBlockClicked = () => trackHome(HomeLabel.START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED);

/**
 * Track home try now button click
 */
export const tryNowClicked = () => trackHome(HomeLabel.TRY_NOW_CLICKED);

/**
 * Track home read manifesto click
 */
export const readManifestClicked = () => trackHome(HomeLabel.READ_MANIFESTO_CLICKED);

