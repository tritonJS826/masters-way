import ReactGA from "react-ga4";

/**
 * Available analytics events
 */
export enum Analytics {
  ERROR = "ERROR",
  PROMISE_REJECTION = "PROMISE_REJECTION",
  SCREEN_VIEW = "SCREEN_VIEW",
}

/**
 * User activation actions
 */
export enum UserActivationAction {
  GET_STARTED_CLICKED = "GET_STARTED_CLICKED",
}

/**
 * User activation labels
 */
export enum UserActivationLabel {
  LOG_IN_CLICKED = "LOG_IN_HEADER_CLICKED",
  START_FOR_FREE__FIRST_SCREEN_CLICKED = "START_FOR_FREE_FIRST_SCREEN_CLICKED",
  START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED = "START_FOR_FREE_WHO_WE_ARE_BLOCK_CLICKED",
  TRY_NOW_CLICKED = "TRY_NOW_CLICKED",
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
    category: "User Activation",
    action: params.action,
    label: params.label,
  });
};

/**
 * GlobalError actions
 */
export enum GlobalErrorAction {
  ERROR = "ERROR",
  PROMISE_REJECTION = "PROMISE_REJECTION",
}

/**
 * Track global errors params
 */
interface TrackGlobalErrorsParams {

  /**
   * Describe action on tracked errors
   */
  action: GlobalErrorAction;

  /**
   * Describe tracked error (event.message, event.reason)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  label: any;
}

/**
 * Tracking global errors
 */
export const trackGlobalErrors = (params: TrackGlobalErrorsParams) => {
  ReactGA.event({
    category: "Global Errors",
    action: params.action,
    label: params.label,
  });
};
