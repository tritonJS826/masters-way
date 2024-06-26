import ReactGA from "react-ga4";
import {AnalyticsCategory} from "src/analytics/AnalyticsCategory";

/**
 * GlobalError actions
 */
enum GlobalErrorAction {
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
  label: string;
}

/**
 * Tracking global errors
 */
const trackGlobalErrors = (params: TrackGlobalErrorsParams) => {
  ReactGA.event({
    category: AnalyticsCategory.GLOBAL_ERRORS,
    action: params.action,
    label: params.label,
  });
};

/**
 * Track error
 */
export const trackGlobalError = (label: string) => trackGlobalErrors({action: GlobalErrorAction.ERROR, label});

/**
 * Track promise rejection
 */
export const trackPromiseRejection = (label: string) => trackGlobalErrors({action: GlobalErrorAction.PROMISE_REJECTION, label});
