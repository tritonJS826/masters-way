import ReactGA from "react-ga4";
import {AnalyticsCategory} from "src/analytics/AnalyticsCategory";

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
    category: AnalyticsCategory.GLOBAL_ERRORS,
    action: params.action,
    label: params.label,
  });
};
