import ReactGA from "react-ga4";
import {AnalyticsCategory} from "src/analytics/AnalyticsCategory";

/**
 * User activation actions
 */
export enum UserActivationAction {
  GET_STARTED_CLICKED = "GET_STARTED_CLICKED"
}

/**
 * User activation labels
 */
export enum UserActivationLabel {
  LOG_IN_CLICKED = "LOG_IN_HEADER_CLICKED",
  START_FOR_FREE__FIRST_SCREEN_CLICKED = "START_FOR_FREE_FIRST_SCREEN_CLICKED",
  START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED = "START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED",
  TRY_NOW_CLICKED = "TRY_NOW_CLICKED"
}

/**
 * Track user interaction with button params
 */
interface TrackUserActivationButtonParams {

  /**
   * Describe action on tracked button click
   */
  action: UserActivationAction;

  /**
   * Describe place and additional info about button.
   * Need if we have few similar buttons in different places (pages, blocks) and get more info which button is more popular
   */
  label: UserActivationLabel;
}

/**
 * Tracking user interaction by clicking buttons
 */
export const trackUserActivationButton = (params: TrackUserActivationButtonParams) => {
  ReactGA.event({
    category: AnalyticsCategory.USER_ACTIVATION,
    action: params.action,
    label: params.label,
  });
};
